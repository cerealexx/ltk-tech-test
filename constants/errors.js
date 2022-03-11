export const errors = Object.freeze({
  MISSING_ARGUMENT: 'Please provide a starting file path: [npm run start /path/to/file.txt]',
  TOO_MANY_ARGUMENTS: 'Please provide only one file path: [npm run start /path/to/file.txt]',
  INVALID_FILE_EXTENSION: 'Please provide a file with a .txt extension: [npm run start /path/to/file.txt]',
  DUPLICATE_FILE: 'Duplicate file found in ',
  FILE_NOT_FOUND: 'File not found. Please check typos: '
});