import svgToImg from 'svg-to-img';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

let txt = readFileSync(__dirname + "/../Front/static/img/logo.svg", 'utf8');

const sizes = [48, 72, 96, 128, 144, 192, 512];

for (let size of sizes) {
    await svgToImg.from(txt).toPng({
        path: __dirname + "/../Front/static/pwa/icons/logo-" + size + ".png",
        width: size,
        height: size
    });
}