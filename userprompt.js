const readline = require('readline');

const question = (q) => {
    var response;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt(q);
    rl.prompt();

    return new Promise((resolve, reject) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
        });
        rl.on('close', () => {
            resolve(response);
        });
    });
};

module.exports = {
    question: question
}