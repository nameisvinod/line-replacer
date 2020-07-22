const fs = require('mz/fs')
const chalk = require('chalk')
const readline = require('readline')
const { readJSONFile, readFile } = require('./readfile')
const { question } = require('./userprompt')

const removeColor = chalk.bold.red
const addColor = chalk.green
const linecolor = chalk.yellow


const replaceAll = async({ replaceConfig, filepaths, silent, userprompt }) => {

    const replaceJSON = readJSONFile(replaceConfig)
    const filesArray = readFile(filepaths).split("\n")

    for (let file of filesArray) {
        for (let { oldText, newText }
            of replaceJSON) {
            console.log(chalk.inverse.bold(`replacing '${oldText}' with '${newText}' for file ${file}`));
            const lines = await fs.readFile(file, 'utf8');
            let lineDetails = []
            lines.split('\n').forEach((line, lineno) => {
                if (line.includes(oldText)) {
                    lineDetails.push({
                        'lineno': lineno,
                        'line': line
                    })
                }
            });
            let changeLogs = []
            for (const { line, lineno }
                of lineDetails) {
                let oldLinePrint = line.substr(0, line.indexOf(oldText)) + removeColor(oldText) + line.substr(line.indexOf(oldText) + oldText.length)
                let newLinePrint = line.substr(0, line.indexOf(oldText)) + addColor(newText) + line.substr(line.indexOf(oldText) + oldText.length)
                let oldLine = line.substr(0, line.indexOf(oldText)) + oldText + line.substr(line.indexOf(oldText) + oldText.length)
                let newLine = line.substr(0, line.indexOf(oldText)) + newText + line.substr(line.indexOf(oldText) + oldText.length)
                console.log(lineDetails.length)
                console.log(linecolor(lineno) + "          " + oldLinePrint)
                console.log(linecolor(lineno) + "          " + newLinePrint)
                let ans = await question('Need to change ? y or n')
                if (ans === 'q')
                    process.exit()
                if (ans === 'n') continue
                if (ans === 'y') {
                    changeLogs.push({ oldLine, lineno, newLine })
                }
            }
            console.log(changeLogs)
        }
    };
}

// filesArray.forEach((file) => {
//     replaceJSON.forEach(({ oldText, newText }) => {
//         console.log(oldText)
//         let lineDetails = []
//         fs.readFile(file, 'utf8', (err, data) => {
//             if (err) throw err;
//             console.log(chalk.inverse.bold(`replacing '${oldText}' with '${newText}'`))
//             data.split('\n').forEach((line, lineno) => {
//                 if (line.includes(oldText)) {
//                     lineDetails.push({
//                         'lineno': lineno,
//                         'line': line
//                     })
//                 }
//             });
//             lineDetails.forEach(({ lineno, line }) => {
//                 let oldLine = linecolor(lineno) + "          " + line.substr(0, line.indexOf(oldText)) + remove(oldText) + line.substr(line.indexOf(oldText) + oldText.length)
//                 let newLine = linecolor(lineno) + "          " + line.substr(0, line.indexOf(oldText)) + add(newText) + line.substr(line.indexOf(oldText) + oldText.length)
//                 console.log(oldLine)
//                 console.log(newLine)
//             })
//         });
//     })
// })
// }
module.exports = {
    replaceAll: replaceAll
}