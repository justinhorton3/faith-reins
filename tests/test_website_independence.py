"""Exercise output comparison and preservation when a build fails or misbehaves."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location(
    'independence', Path(__file__).resolve().parents[1] / 'scripts/check-website-independence.py')
independence = importlib.util.module_from_spec(spec)
spec.loader.exec_module(independence)


class WebsiteIndependenceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / 'site'
        (self.root / 'brand').mkdir(parents=True)
        (self.root / 'brand/original.txt').write_text('preserve these bytes')

    def build(self, root, content='same'):
        (root / 'dist').mkdir()
        (root / 'dist/index.html').write_text(content)

    def assert_brand_preserved(self):
        self.assertEqual((self.root / 'brand/original.txt').read_text(), 'preserve these bytes')

    def test_independent_build_passes_and_restores_brand(self):
        result = independence.compare_builds(self.root, self.build)
        self.assertEqual(result['compared_files'], 1)
        self.assert_brand_preserved()

    def test_brand_dependent_output_fails(self):
        def build(root):
            self.build(root, str((root / 'brand').exists()))
        with self.assertRaisesRegex(independence.IndependenceError, 'index.html'):
            independence.compare_builds(self.root, build)
        self.assert_brand_preserved()

    def test_missing_brand_build_failure_restores_original(self):
        def build(root):
            if not (root / 'brand').exists():
                raise RuntimeError('missing build input')
            self.build(root)
        with self.assertRaisesRegex(RuntimeError, 'missing build input'):
            independence.compare_builds(self.root, build)
        self.assert_brand_preserved()

    def test_build_recreating_brand_preserves_both_directories(self):
        def build(root):
            if not (root / 'brand').exists():
                (root / 'brand').mkdir()
                (root / 'brand/generated.txt').write_text('unexpected generated directory')
            self.build(root)
        with self.assertRaisesRegex(independence.IndependenceError, 'original preserved'):
            independence.compare_builds(self.root, build)
        recovery = list(self.root.parent.glob('*-recovery'))
        self.assertEqual(len(recovery), 1)
        self.assertEqual((recovery[0] / 'brand/original.txt').read_text(), 'preserve these bytes')
        self.assertTrue((self.root / 'brand/generated.txt').exists())


if __name__ == '__main__':
    unittest.main()
