# Line Replacer

## About

Cli to find and replace lines in a file(s) with user prompt.

## Prerequisites

### Node and NPM

Install the latest version of node and npm from [here](https://nodejs.org/en/download/)

<li>Test Node. To see if Node is installed, type <code>node -v</code> in Terminal. This should print the version number so you’ll see something like this <code>v10.13.0</code>.</li>

<li>Test NPM. To see if NPM is installed, type <code>npm -v</code> in Terminal. This should print the version number so you’ll see something like this <code>6.4.1</code></li>

## Install

    git clone https://zgit.csez.zohocorpin.com/vinodkumar.s/line-replacer.git && cd line-replacer/

    npm install

## Configuration

<li>Create a folder named '<code>changeLogs</code>' in root directory</li>
<li>'<code>filepaths.txt</code>' file should contain the absolute path to the files that need to be updated</li>
<li>'<code>replace-config.json</code>' file should conatain the old and new text values as json object</li>

## Commands

### replace all

replace all occurance of a text in the given files

#### Options:

<ul>
<li>--help : Show help [boolean]</li>
<li>--version : Show version number [boolean]</li>
<li>--replace-config : replace config file name [string][required]</li>
<li>--file-paths:file containing file paths [string][required]</li>
<li>--silent : do not print output [boolean][default: true]</li>
<li>--user-prompt : user prompt [boolean][default: true]
</li>
</ul>

#### Usage

    node app.js replace-all --replace-config=replace-config.json --file-paths=filepaths.txt

#### Screenshot

![Image](/demo/demo.png)

#### ChangeLogs

A change logs json file will be written at the end of a successful execution of the commnad with timestamp attached to the file name. It will contain all the changes done to the files

Format of ChnageLog file

    {
        "file":         file-name,
        "hasChanged":   true | false,
        "lineno":       line number of change,
        "change":       key change,
        "oldLine":      previous value of line,
        "newLine":      current value of line
    }

Change log can be used to ensure or trace back to the changes done
