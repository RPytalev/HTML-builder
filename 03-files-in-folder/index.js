const fs = require('fs');
const path = require('path');

let secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, async (err, items) => {
    if (err) throw err;

    //sconst paths = items.map((item) => path.join(secretFolder, item));

    //const fullPath = path.join(secretFolder, paths[i]);
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

    // for (let i = 0; i < paths.length; i++) {
    //     const fullPath = path.join(secretFolder, paths[i]);

    //     const ext =  path.extname(fullPath).toLowerCase();

    //     fs.stat(paths[i], function (err, stats) {
    //         console.log(`${ext} - ${stats.size}`);
    //     });
    // }

    

    // let fileDescriptions = files.map(file => {
    //     const ext = path.extname(file).toLowerCase()
    //     //const size = fs.stat(file);

    //     return `${file.name} - ${ext}`;
    // })

    //console.log(fileDescriptions);
})