const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!['node_modules', '.next', '.git'].includes(file)) {
                walk(filePath, fileList);
            }
        } else {
            if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx') || filePath.endsWith('.ts')) {
                fileList.push(filePath);
            }
        }
    }
    return fileList;
}

const rootDir = 'c:/Users/User/Downloads/sahitya-bari';
const targetDirs = ['app', 'components'].map(d => path.join(rootDir, d));
let files = [];
for (const dir of targetDirs) {
    if (fs.existsSync(dir)) {
        files = walk(dir, files);
    }
}

let modifiedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // A list of regex replacements
    const prefixes = [
        'rounded',
        'rounded-t', 'rounded-b', 'rounded-l', 'rounded-r',
        'rounded-tl', 'rounded-tr', 'rounded-bl', 'rounded-br'
    ];
    
    prefixes.forEach(prefix => {
        // e.g. Regex to match \brounded-xs\b, etc.
        const regex = new RegExp(`\\b${prefix}-(xs|sm|md|lg|xl|2xl|3xl|full)\\b`, 'g');
        content = content.replace(regex, `${prefix}-[var(--radius-$1)]`);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Finished. Modified ${modifiedCount} files.`);
