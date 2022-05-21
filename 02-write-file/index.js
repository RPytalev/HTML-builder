const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let outputFilePath = path.join(__dirname, 'text.txt');
let writeableStream = fs.createWriteStream(outputFilePath);

rl.question('Hello! Enter text... ', function (text) {
    writeToFile(text);
});

rl.on('line', (text) => {
    writeToFile(text);
});

rl.on('SIGINT', () => {
    endProcess();
});

function writeToFile (text) {
    if (text === "exit") {
        endProcess();
    }

    writeableStream.write(text);
}

function endProcess() {
    console.log('Bye bye');
    process.exit(0);
}