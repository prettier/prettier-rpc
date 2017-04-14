var prettier = require('prettier');
var rpc = require('vscode-jsonrpc');

// Need to be clever to get at node's globals b/c of rollup. Can't just use `global`
const realGlobals = (Function('return this')());

// realGlobals.require doesn't exist when run via eslint, no idea why
const isESLint = realGlobals && 
  realGlobals.process && 
  realGlobals.process.mainModule && 
  realGlobals.process.mainModule.filename && 
  realGlobals.process.mainModule.filename.endsWith('eslint.js');

const isRequired = realGlobals.require && realGlobals.require.main === module;

if (isESLint || isRequired) {
  // require('prettier-rpc-XXX')
  module.exports = prettier;
} else {
  // node prettier-rpc-XXX.js
  var connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(process.stdin),
    new rpc.StreamMessageWriter(process.stdout)
  );

  connection.onRequest('format', (content, options) => {
    try {
      return {error: null, formatted: prettier.format(content, options)};
    } catch(e) {
      return {error: e.toString()};
    }
  });

  connection.listen();
}
