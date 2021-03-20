const csv = require('csvtojson');
const path = require('path');
const Promise = require('promise');

const writeStream = require('fs').createWriteStream(path.resolve(__dirname, 'output.txt'));

csv()
    .fromStream(require('fs').createReadStream(path.resolve(__dirname, 'nodejs-hw1-ex1.csv')))
    .subscribe((json) => {
        return new Promise((resolve, _reject) => {
            delete json['Amount']
            writeStream.write(JSON.stringify(json) + '\r\n');
            resolve();
        })
    }, (error) => {
        console.log(error);
    }, () => {
        writeStream.close();
    });