const yargs = require('yargs')
const replace = require("./replace.js")

yargs.command('replace-all',
    'replace all occurances of from-text to to-text in all the files', (yargs) => {
        yargs.option('replace-config', {
            describe: 'replace config file name',
            alias: 'rc',
            type: 'string',
            demandOption: true,
            default: 'replace-config.json'
        }).option('file-paths', {
            describe: 'file containing file paths',
            alias: 'fp',
            type: 'string',
            demandOption: true,
            default: 'filepaths.txt'
        }).options('silent', {
            describe: 'do not print out put',
            alias: 's',
            type: 'boolean',
            default: true,
        }).options('user-prompt', {
            describe: 'user prompt',
            type: 'boolean',
            default: true,
        })
    }, (yargs) => {
        replace.replaceAll({
            'replaceConfig': yargs['replace-config'],
            'filepaths': yargs['file-paths'],
            'silent': yargs['silent'],
            'userprompt': yargs['user-prompt']
        })
    }
)

yargs.parse()