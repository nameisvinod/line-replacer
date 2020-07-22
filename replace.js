const fs = require('mz/fs')
const chalk = require('chalk')
const { readJSONFile, readFile } = require('./readfile')
const { question } = require('./userprompt')
const fileReplace = require('replace-in-file');
const { getNow } = require('./utils.js')

const removeColor = chalk.bold.red
const addColor = chalk.green
const linecolor = chalk.yellow


const replaceAll = async({ replaceConfig, filepaths, silent, userprompt }) => {

    const replaceJSON = readJSONFile(replaceConfig)
    const filesArray = readFile(filepaths).split("\n")
    const changeLogs = []; //contains all the changes done in a set

    for (let file of filesArray) {
        for (let { oldText, newText }
            of replaceJSON) {
            console.log(chalk.inverse.bold(`replacing '${oldText}' with '${newText}' for file ${file}`));
            const lines = await fs.readFile(file, 'utf8');
            let lineDetails = []
            lines.split('\n').forEach((line, lineno) => {
                if (line.includes(oldText)) {
                    lineDetails.push({
                        'lineno': lineno + 1, // array index and file line no
                        'line': line
                    })
                }
            });
            let changes = []
            for (const { line, lineno }
                of lineDetails) {
                let oldLinePrint = line.substr(0, line.indexOf(oldText)) + removeColor(oldText) + line.substr(line.indexOf(oldText) + oldText.length)
                let newLinePrint = line.substr(0, line.indexOf(oldText)) + addColor(newText) + line.substr(line.indexOf(oldText) + oldText.length)
                let oldLine = line.substr(0, line.indexOf(oldText)) + oldText + line.substr(line.indexOf(oldText) + oldText.length)
                let newLine = line.substr(0, line.indexOf(oldText)) + newText + line.substr(line.indexOf(oldText) + oldText.length)
                console.log(linecolor(lineno) + "          " + oldLinePrint)
                console.log(linecolor(lineno) + "          " + newLinePrint)
                let ans = await question('Need to change ? y or n : ')
                if (ans === 'q')
                    process.exit()
                if (ans === 'n') continue
                if (ans === 'y') {
                    changes.push({ oldLine, lineno, newLine })
                }
            }
            for (change of changes) {
                try {
                    const results = fileReplace.sync({
                        files: file,
                        from: change.oldLine,
                        to: change.newLine
                    });
                    results[0].lineno = change.lineno
                    results[0].change = `${oldText} to ${newText}`
                    changeLogs.push({...results[0], ...change })
                    console.log('Replacement results:', results)
                } catch (error) {
                    console.error('Error occurred:', error);
                }
            }
        }
    };
    try {
        let outFile = `./changeLogs/${getNow()}-changeLogs.json`;
        fs.writeFileSync(outFile, JSON.stringify(changeLogs), { flag: 'a+' })
        console.log(chalk.keyword('orange')(`outfile written to ${outFile}`))
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    replaceAll: replaceAll
}