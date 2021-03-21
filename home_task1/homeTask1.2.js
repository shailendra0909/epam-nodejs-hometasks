const csv = require('csvtojson');
const path = require('path');

const writeStream = require('fs').createWriteStream(path.resolve(__dirname, 'output.txt'));

csv()
    .fromStream(require('fs').createReadStream(path.resolve(__dirname, 'nodejs-hw1-ex1.csv')))
    .subscribe((json) => {
        delete json['Amount']
        writeStream.write(JSON.stringify(json) + '\r\n');
    }, (error) => {
        console.log(error);
    }, () => {
        writeStream.close();
    });