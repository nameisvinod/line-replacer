const fs = require('fs')

const readJSONFile = (filepath) => {
    try {
        const data = readFile(filepath)
        return JSON.parse(data)
    } catch (err) {
        console.log(chalk.red("error in readJSONFile", err))
        return []
    }
}

const readFile = (filepath) => {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        const data = dataBuffer.toString();
        return data;
    } catch (err) {
        console.log("error in readFile", err)
        return "";
    }
}
const writeFile = (filepath, data) => {
    fs.writeFileSync(filepath, data, { flag: 'a+' })
}
module.exports = {
    readFile: readFile,
    readJSONFile: readJSONFile,
    writeFile: writeFile
}