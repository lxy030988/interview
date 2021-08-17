#! /usr/bin/env node

// npm link
// console.log('cli')

const program = require('commander')
program.version(require('../package').version)
program
  .command('init <name>')
  .description('init project')
  .action((name) => {
    console.log('init ' + name, process.argv)
  })

program.parse(process.argv)
