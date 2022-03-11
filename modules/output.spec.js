import { exitWithError, warn } from './output.js';
import { errors } from '../constants/errors.js';
import { warnings } from '../constants/warnings.js';

describe('exitWithError', () => {
  it('should print the error and exit the program', () => {
    // arrange
    const error = errors.DUPLICATE_FILE
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    // act
    exitWithError(error);
    // assert
    expect(console.error).toHaveBeenCalledWith('\x1b[31m%s\x1b[0m', `[ERROR] ${error}`);
    expect(process.exit).toHaveBeenCalled();
  });
});

describe('warn', () => {
  it('should print the warn', () => {
    // arrange
    const message = warnings.MULTIPLE_VALUES;
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    // act
    warn(message);
    // assert
    expect(console.warn).toHaveBeenCalledWith('\x1b[33m%s\x1b[0m', `[WARN] ${message}`);
  });
});