import test from 'node:test';
import assert from 'node:assert/strict';
import { validateResume } from '../src/scripts/career-application.js';
test('résumé validation accepts supported documents up to 10 MB',()=>{for(const name of ['resume.pdf','resume.doc','resume.DOCX'])assert.equal(validateResume({name,size:10*1024*1024}), '');});
test('résumé validation explains missing, unsupported, and oversized files',()=>{assert.match(validateResume(null),/Choose/);assert.match(validateResume({name:'resume.exe',size:10}),/PDF or Word/);assert.match(validateResume({name:'resume.pdf',size:10*1024*1024+1}),/over 10 MB/);});
