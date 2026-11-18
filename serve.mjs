import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createGzip } from 'node:zlib';
import { extname, resolve, sep } from 'node:path';

const root = resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    const path = decodeURIComponent(url.pathname);
    const file = resolve(root, '.' + path + (path.endsWith('/') ? 'index.html' : ''));
    if (!file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    const info = await stat(file);
    if (!info.isFile()) { response.writeHead(404).end(); return; }
    response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    const compressible = ['.html', '.css', '.js', '.json', '.txt'].includes(extname(file));
    if (compressible) response.setHeader('Vary', 'Accept-Encoding');
    const gzip = compressible && /\bgzip\b/.test(request.headers['accept-encoding'] || '');
    if (gzip) response.setHeader('Content-Encoding', 'gzip');
    else response.setHeader('Content-Length', info.size);
    if (request.method === 'HEAD') { response.end(); return; }
    const stream = createReadStream(file);
    if (gzip) stream.pipe(createGzip()).pipe(response);
    else stream.pipe(response);
  } catch { response.writeHead(404).end(); }
}).listen(8743, '127.0.0.1', () => console.log('http://127.0.0.1:8743/'));
