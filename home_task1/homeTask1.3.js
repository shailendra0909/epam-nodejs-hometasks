import csv from 'csvtojson';
import  path from 'path';
import fs from 'fs';



try {
    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output3.txt'));
    csv({ ignoreColumns: /(amount)/ }).preFileLine((fileLine, idx) => {
        if (idx === 0) { return fileLine.toLowerCase(); }
        return fileLine;
    })
        .fromStream(require('fs').createReadStream(path.resolve(__dirname, 'nodejs-hw1-ex1.csv')))
        .subscribe((json) => {
            writeStream.write(JSON.stringify(json) + '\r\n');
        }, (error) => {
            console.log(error);
        }, () => {
            writeStream.close();
        });
}
catch (error) {
    console.log('error occured while performing action');
}