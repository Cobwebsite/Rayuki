import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const root = join(__dirname, "..");
const file = join(__dirname, "..", "HttpServer.cs");
const content = readFileSync(file, "utf-8");

const versionRegex = /Version = "(\d+)\.(\d+)\.(\d+)"/;
const match = content.match(versionRegex);

if (match) {
    const major = parseInt(match[1]);
    const minor = parseInt(match[2]);
    let patch = parseInt(match[3]);
    const newVersion = `${major}.${minor}.${patch}`;
    execSync(`docker build -t rayuki/core:latest -t rayuki/core:${newVersion} .`, {
        cwd: root
    });
    execSync(`docker push rayuki/core:latest`, {
        cwd: root
    });
    execSync(`docker push rayuki/core:${newVersion}`, {
        cwd: root
    });
}

