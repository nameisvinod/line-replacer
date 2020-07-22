# LINE REPLACER

To replace lines in a file(s) based on user prompt.

## Usage

### replace all

replace all occurance of a text in the given files

    node app.js replace-all --replace-config=replace-config.json --file-path=file-path.js

Options:

--help Show help [boolean]

--version Show version number [boolean]

--replace-config replace config file name [string][required]

--file-paths file containing file paths [string][required]

--silent do not print out put [boolean][default: true]

--user-prompt user prompt [boolean][default: true]
