/**
* Outputs formatted errors and exits the program.
*/
const exitWithError = error => {
  console.error('\x1b[31m%s\x1b[0m', '[ERROR] ' + error);
  process.exit(1);
}

/**
* Outputs formatted warn.
*/
const warn = message => {
  console.warn('\x1b[33m%s\x1b[0m', '[WARN] ' + message);
}

export { exitWithError, warn };