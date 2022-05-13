const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, '01-read-file'), err => {
    if (err) throw err;
});

fs.writeFile(
    path.join(__dirname, '01-read-file', 'text.txt'),
    'Нет хуже причины для выбора имени с, чем та, что имена a и b уже заняты.',
    (err) => {
        if (err) throw err;
    }
);

fs.readFile(
    path.join(__dirname, '01-read-file', 'text.txt'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
);