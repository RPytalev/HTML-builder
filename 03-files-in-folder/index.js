const fs = require('fs');
const path = require('path');

let secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, (_, items) => {
    items.forEach(file => {
        const fullPath = path.join(secretFolder, file);
        const name = path.parse(file).name;
        const ext =  path.parse(file).ext.substring(1); 

        fs.stat(fullPath, (_, stats) => {
            if (!stats.isDirectory()) {
                console.log(`${name} - ${ext} - ${stats.size}`);
            }
        });
    });
});