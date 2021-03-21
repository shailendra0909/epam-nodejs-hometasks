import csv from 'csvtojson';
import  path from 'path';
import fs from 'fs';

const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output3.txt'));

csv()
    .fromStream(fs.createReadStream(path.resolve(__dirname, 'nodejs-hw1-ex1.csv')))
    .subscribe((json) => {
        delete json['Amount']
        writeStream.write(JSON.stringify(json) + '\r\n');
    }, (error) => {
        console.log(error);
    }, () => {
        writeStream.close();
    });