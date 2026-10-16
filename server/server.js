import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import path from 'node:path';
import data from './data.js';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    ///////////////////////////////
    try {
        if (req.url.startsWith('/products')) {
            console.log("'/products' ga so'rov keldi.");

            if (req.method === 'GET') {
                res.writeHead(200);
                res.end(JSON.stringify(data));
            }
        } else if (req.url.startsWith('/img')) {
            const imageName = path.basename(req.url);
            const imagePath = path.join(
                import.meta.dirname,
                'img',
                imageName
            );

            readFile(imagePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Rasm topilmadi');
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': 'image/png',
                });

                res.end(data);
            });

            return;
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ holat: "Noto'g'ri URL" }));
        }
    } catch (err) {
        console.log('Xatolik:', err.message);
    }
});

server.listen(3300, () => {
    console.log('Server 3300-portda ishlayapti.');
});
