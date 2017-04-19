var prettier = require('prettier');
var rpc = require('vscode-jsonrpc');

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
