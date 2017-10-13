#! /usr/bin/env node

let fs = require('fs');
let chalk = require('chalk');

fs.readFile('./package.json', 'utf8', function (err, data) {

    if (err) {
        if(err.code === 'ENOENT') {
            console.error(chalk.red('Unable to find the file "package.json" in the current directory'));
            process.exit();    
        }
        console.error(chalk.red(err));
        process.exit();
    }

    let packageConfig = JSON.parse(data);

    if (packageConfig.scripts === undefined) {
        console.error(chalk.red('No "script" field defined in the "package.json" file'));
        process.exit();
    }

    let scripts = packageConfig.scripts;
    for (var key in scripts) {
        let scriptDesc = '{0}: {1}'.replace(/{(\d+)}/g, function(match, number) { 
            return {
                0: chalk.bold.green(key),
                1: chalk.gray(scripts[key]),
            }[number];
          });
        console.log(scriptDesc);
    }
});