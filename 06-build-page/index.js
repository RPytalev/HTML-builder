const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const src = __dirname;
const dest = path.join(__dirname, 'project-dist');

fs.rm(dest, { recursive: true }, async () => await GenerateBundle(src, dest));

async function GenerateBundle(src, dest) {
    await CreateProjectDistDir(dest);
    await CopyAssets(src, dest);
    await GenerateHtmlFromTemplate(src, dest);
    await ConcatenateCss(src, dest);
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

    for (entry of entries) {
        const entryPath = path.join(srcComponents, entry);
        const entryName = path.parse(entryPath).name;
        const entryExtension = path.parse(entryPath).ext;

        if (entryExtension === '.html') {
            components[entryName] = await fsPromises.readFile(entryPath, 'utf-8');
        }
    }

    const srcTemplate = path.join(src, 'template.html');
    const template = await fsPromises.readFile(srcTemplate, 'utf-8');
    const html = template.replace(/{{(.+?)}}/g, (_,g1) => components[g1]);

    const destIndex = path.join(dest, 'index.html');
    await fsPromises.writeFile(destIndex, html);
}

async function ConcatenateCss(src, dest) {
    srcStyles = path.join(src, 'styles');

    let entries = await fsPromises.readdir(srcStyles);
    let stylesArray = [];
     
    for (entry of entries) {
        const entryPath = path.join(srcStyles, entry);
        const entryExtension = path.parse(entryPath).ext;

        if (entryExtension === '.css') {
            const style = await fsPromises.readFile(entryPath, 'utf-8');
            stylesArray.push(style);
        }
    }

    const styles = stylesArray.join('');
    const destStyles = path.join(dest, 'style.css');
    await fsPromises.writeFile(destStyles, styles);
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