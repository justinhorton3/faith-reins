import fs from 'node:fs';
import path from 'node:path';

// The Wix Astro hosting adapter emits a Workers directory beside the static files.
// Move the whole worker tree out of the client upload so server code is never public assets.
const source = path.resolve('dist/_worker.js');
const target = path.resolve('.wix-server');
if (!fs.existsSync(source)) throw new Error('Account worker output is missing; publication must stop.');
fs.rmSync(target, { recursive: true, force: true });
fs.renameSync(source, target);
console.log('Account worker separated from public output.');
