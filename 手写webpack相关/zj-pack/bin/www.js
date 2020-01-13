#! /usr/bin/env node


const path = require('path');
let config = require(path.resolve('webpack.config.js'));

let Compiler = require('../lib/Compiler');

let compiler = new Compiler(config);

compiler.run();
