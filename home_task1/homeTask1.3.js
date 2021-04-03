import csv from 'csvtojson';
import path from 'path';
import fs from 'fs';

const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output3.txt'));
const readStream = fs.createReadStream(path.resolve(__dirname, 'nodejs-hw1-ex1.csv'));

writeStream.on('error', () => {
    console.log(`error in writing the file ${path.resolve(__dirname, 'output3.txt')}`);
});
readStream.on('error', () => {
    console.log(`error in reading the file ${path.resolve(__dirname, 'nodejs-hw1-ex1.csv')}`);
});

csv({ ignoreColumns: /(amount)/ }).preFileLine((fileLine, idx) => {
    if (idx === 0) { return fileLine.toLowerCase(); }
    return fileLine;
})
    .fromStream(readStream)
    .subscribe((json) => {
        writeStream.write(JSON.stringify(json) + '\r\n');
    }, (error) => {
        console.log(error);
    }, () => {
        writeStream.close();
    });