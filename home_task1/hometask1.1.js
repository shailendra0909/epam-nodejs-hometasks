const read = process.openStdin();

read.on('data', (input) => {
    const result = input.toString().trim().split('').reverse().join('');
    console.log(result);
});