let assert = require('assert');
let fs = require('fs-extra');
let path = require('path');
let rimraf = require('rimraf');
const { spawnSync } = require('child_process');

let testWorkspace = path.dirname(module.filename) + '/workspace';
let testData = path.dirname(module.filename) + '/data';
let scriptPath = fs.realpathSync(path.dirname(module.filename) + '/../bin/script-list.js');

if (fs.existsSync(testWorkspace)) {
    console.log('# Removing old test workspace');
    rimraf.sync(testWorkspace);
}
console.log('# Creating test workspace');
fs.mkdirSync(testWorkspace);


console.log('');
describe('Script list', function () {

    describe('when no package.json file is found', function () {
        let scriptProcess = spawnSync(scriptPath, [], { cwd: testWorkspace });
        let stdoutString = scriptProcess.stdout.toString();
        let exitCode = scriptProcess.status;

        it('should show an error message', function () {
            assert.equal(stdoutString, 'Unable to find the file "package.json" in the current directory');
        });
        it('should exit with code 1', function () {
            assert.equal(exitCode, 1);
        });
    });

    describe('when the package.json file does not contain the "script" field', function () {
        fs.copySync(testData + '/package_without_script.json', testWorkspace + '/package.json');

        let scriptProcess = spawnSync(scriptPath, [], { cwd: testWorkspace });
        let stdoutString = scriptProcess.stdout.toString();
        let exitCode = scriptProcess.status;
        
        it('should show an error message', function () {
            assert.equal(stdoutString, 'No "script" field defined in the "package.json" file');
        });
        
        it('should exit with code 1', function () {
            assert.equal(exitCode, 1);
        });
    });

    describe('when the package.json file is correct', function () {
        fs.copySync(testData + '/package_proper.json', testWorkspace + '/package.json');

        let scriptProcess = spawnSync(scriptPath, [], { cwd: testWorkspace });
        let stdoutString = scriptProcess.stdout.toString();
        let exitCode = scriptProcess.status;
        
        it('should list all available scripts', function () {
            assert.equal(stdoutString, 'start: node app/index.js\ninstall: node-gyp rebuild\n');
        });
        
        it('should exit with code 0', function () {
            assert.equal(exitCode, 0);
        });
    });

});
