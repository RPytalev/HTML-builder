const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const src = path.join(__dirname, 'styles');
const dest = path.join(__dirname, 'project-dist');

ConcatenateCss(src, dest);

async function ConcatenateCss(src, dest) {
    let entries = await fsPromises.readdir(src);
    let stylesArray = [];
     
    for (entry of entries) {
        const entryPath = path.join(src, entry);
        const entryExtension = path.parse(entryPath).ext;
    
        if (entryExtension === '.css') {
            const style = await fsPromises.readFile(entryPath, 'utf-8');
            stylesArray.push(style);
        }
    }
    
    const styles = stylesArray.join('');
    const destStyles = path.join(dest, 'bundle.css');
    await fsPromises.writeFile(destStyles, styles);    
}