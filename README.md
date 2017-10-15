# NPM Script List

NPM Script list is a small CLI tool that allow you to list available scripts from the `package.json` file in your project directory.

## Install 

Install NPM script list by running the following command.

```
npm install -g npm-script-list
```

## Usage 

Go to your project root directory (the one containing the package.json file) and run `npm-script-list`. 

Exemple :

```sh
$ npm-script-list
start: node app/index.js
install: node-gyp rebuild
```

## Testing

If you want to edit this module, be sure to update and run tests with the `npm test` command.

## Contributing

This module is registered under [the MIT licence](LICENSE.md). Feel free to use it and/or contribute.