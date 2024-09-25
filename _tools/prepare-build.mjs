import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "..", "HttpServer.cs");

let content = readFileSync(file, "utf-8");

function updateVersion() {
    const versionRegex = /Version = "(\d+)\.(\d+)\.(\d+)"/;
    const match = content.match(versionRegex);

    if (match) {
        const major = parseInt(match[1]);
        const minor = parseInt(match[2]);
        let patch = parseInt(match[3]);

        patch += 1; // Incrémenter le numéro patch

        const newVersion = `Version = "${major}.${minor}.${patch}"`;
        content = content.replace(versionRegex, newVersion);

    } else {
        throw 'Version non trouvée dans HttpServer.cs'
    }
}

function updateBuild() {
    const dateRegex = /BuildDate = ".*"/;
    const match = content.match(dateRegex);
    if (match) {
        const newDate = `BuildDate = "${new Date().toISOString()}"`;
        content = content.replace(dateRegex, newDate);
    } else {
        throw 'BuildDate non trouvée dans HttpServer.cs'
    }
}

updateVersion();
updateBuild();
writeFileSync(file, content, 'utf8');
