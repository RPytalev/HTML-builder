const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const src = path.join(__dirname, 'styles');
const dest = path.join(__dirname, 'project-dist');

let bundle = '';

let readableStream;

readableStream.on("data", function(chunk){ 
    bundle = bundle + chunk;
});

fs.readdir(src, (_, items) => {
    items.forEach(async item => {
        readableStream = fs.createReadStream(path.join(src, item), "utf8");


        await fsPromises.copyFile(path.join(src, item), path.join(dest, 'bundle.css'));
    });
});