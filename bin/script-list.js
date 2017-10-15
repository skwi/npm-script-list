#! /usr/bin/env node

let fs = require('fs');
let chalk = require('chalk');

fs.readFile('./package.json', 'utf8', function (err, data) {

    if (err) {
        if(err.code === 'ENOENT') {
            process.stdout.write(chalk.red('Unable to find the file "package.json" in the current directory'));
            process.exit(1);    
        }
        process.stdout.write(chalk.red(err));
        process.exit(1);
    }

    let packageConfig = JSON.parse(data);

    if (packageConfig.scripts === undefined) {
        process.stdout.write(chalk.red('No "script" field defined in the "package.json" file'));
        process.exit(1);
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