import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "..", "HttpServer.cs");

let content = readFileSync(file, "utf-8");

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(txt) {
    return new Promise((resole) => {
        rl.question(txt, (answer) => {
            resole(answer)
        });
    })
}

async function yesOrNo(txt) {
    // Demander à l'utilisateur s'il veut augmenter la version
    const answer = await question(txt);
    if (answer.toUpperCase() === 'O') {
        return true;
    } else if (answer.toUpperCase() === 'N') {
        return false;
    } else {
        return await ask();
    }
}

async function updateVersion() {
    if (await yesOrNo('Voulez-vous augmenter la version ? (O/N) : ')) {
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

async function main() {
    await updateVersion();
    updateBuild();
    writeFileSync(file, content, 'utf8');
}

await main();
rl.close();