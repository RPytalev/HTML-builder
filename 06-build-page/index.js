const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const src = __dirname;
const dest = path.join(__dirname, 'project-dist');

GenerateBundle(src, dest);

async function GenerateBundle(src, dest) {
    await CreateProjectDistDir(dest);
    await CopyAssets(src, dest);
    await GenerateHtmlFromTemplate(src, dest)
    // add steps
}

async function CreateProjectDistDir(dest) {
    await fsPromises.mkdir(dest, { recursive: true });
}

async function CopyAssets(src, dest) {
    const srcAssets = path.join(src, 'assets');
    const destAssets = path.join(dest, 'assets');

    await copyDir(srcAssets, destAssets);
}

async function GenerateHtmlFromTemplate(src, dest) {
    srcComponents = path.join(src, 'components');

    let entries = await fsPromises.readdir(srcComponents);
    let components = {};

    entries.forEach(entry => {
        const entryPath = path.join(srcComponents, entry);
        const entryName = path.parse(entryPath).name;

        let readableStream = fs.createReadStream(entryPath, "utf8");

        readableStream.on("data", function(chunk){
            components[entryName] = components[entryName] + chunk;
        });
    });

    const srcTemplate = path.join(src, 'template.html');
    const template = await fsPromises.readFile(srcTemplate, 'utf-8');

    const html = template.replace(/{{(.+?)}}/g, (_,g1) => components[g1] || g1);
    const destIndex = path.join(dest, 'index.html');

    let writeableStream = fs.createWriteStream(destIndex);
    writeableStream.write(html);
}

function ConcatenateCss(src, dest) {
    // Filipp
}

async function copyDir(src, dest) {
    let entries = await fsPromises.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await fsPromises.mkdir(destPath, { recursive: true });
            await copyDir(srcPath, destPath)
        } else {
            await fsPromises.copyFile(srcPath, destPath);
        }
    }
}

