"""Run with: python -m unittest discover -s skills/faith-reins-v7-hero/tests"""
import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

try:
    from PIL import Image
    import cairosvg  # noqa: F401
    SUPPORTED = True
except ImportError:
    SUPPORTED = False

SCRIPT = Path(__file__).resolve().parents[3] / 'scripts/compose-approved-brand.py'


@unittest.skipUnless(SUPPORTED, 'Install Pillow and CairoSVG for image skill tests')
class ExactV7BrandComposition(unittest.TestCase):
    def setUp(self):
        self.work = tempfile.TemporaryDirectory()
        self.root = Path(self.work.name)
        self.logo = self.root / 'approved/horse/horse-master-green.svg'
        self.logo.parent.mkdir(parents=True, exist_ok=True)
        svg = b'<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path fill="#173A2E" d="M10 10 L70 20 L20 70 Z"/></svg>'
        self.logo.write_bytes(svg)
        self.digest = hashlib.sha256(svg).hexdigest()
        (self.root / 'RELEASE-MANIFEST.json').write_text(json.dumps({'assets': [
            {'path':'approved/horse/horse-master-green.svg', 'sha256':self.digest}
        ]}))
        self.source = self.root / 'clean.png'
        Image.new('RGB', (400, 300), (238, 234, 219)).save(self.source)
        self.cfg = self.root / 'recipe.json'
        self.recipe = {
            'schema': 'faith-reins-v7-brand-composition/1',
            'source': 'clean.png', 'source_sha256': hashlib.sha256(self.source.read_bytes()).hexdigest(),
            'unbranded_source_visual_reviewed': True, 'output':'composed.png',
            'marks':[{'asset':'horse-green','center':[.5,.5],'width':.09}]
        }
        self.save_cfg()

    def tearDown(self):
        self.work.cleanup()

    def save_cfg(self):
        self.cfg.write_text(json.dumps(self.recipe))

    def call(self, action):
        return subprocess.run([sys.executable, str(SCRIPT), action, str(self.cfg), '--v7-root',str(self.root)],
                              capture_output=True, text=True, check=False)

    def test_exact_vector_renders_and_verifies(self):
        a = self.call('render')
        self.assertEqual(a.returncode, 0, a.stderr)
        proof = json.loads((self.root/'composed.png.v7-proof.json').read_text())
        self.assertEqual(proof['marks'][0]['svg_sha256'], self.digest)
        self.assertEqual(proof['status'], 'composition-verified-not-owner-approved')
        b = self.call('verify')
        self.assertEqual(b.returncode, 0, b.stderr)

    def test_unapproved_master_refused(self):
        self.recipe['marks'][0]['asset'] = 'running-horse-generated'
        self.save_cfg()
        result = self.call('render')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('unapproved', result.stderr.lower())

    def test_uninspected_source_refused(self):
        self.recipe['unbranded_source_visual_reviewed'] = False
        self.save_cfg()
        self.assertNotEqual(self.call('render').returncode, 0)

    def test_changed_master_refused(self):
        self.logo.write_bytes(self.logo.read_bytes().replace(b'#173A2E',b'#FF0000'))
        self.assertNotEqual(self.call('render').returncode, 0)

    def test_modified_pixels_refused(self):
        self.assertEqual(self.call('render').returncode, 0)
        path = self.root/'composed.png'
        with Image.open(path) as im:
            image = im.copy()
        image.putpixel((25,25), (25,25,25))
        image.save(path)
        result = self.call('verify')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('pixel-identical', result.stderr.lower())

    def test_cannot_overwrite_approved_output(self):
        self.assertEqual(self.call('render').returncode, 0)
        self.assertNotEqual(self.call('render').returncode, 0)


if __name__ == '__main__':
    unittest.main()