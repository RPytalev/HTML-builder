const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

fs.rmdir(dest, {recursive: true}, () => {
    fsPromises.mkdir(dest, { recursive: true }).then(async () => {
        fs.readdir(src, (_, items) => {
            items.forEach(async item => {
                await fsPromises.copyFile(path.join(src, item), path.join(dest,item));
            });
        });
    });
})
