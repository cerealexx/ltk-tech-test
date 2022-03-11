jest.mock('./text.js', () => ({
  getLineValues: jest.fn()
}));
import { checkArgumentFormat, checkDuplicateFiles } from './checks.js';
import { errors } from '../constants/errors.js';
import { getLineValues } from './text.js';

describe('checkArgumentFormat', () => {
  it('should throw an error if no file is provided', () => {
    // arrange
    const error = errors.MISSING_ARGUMENT;
    process.argv = ['node', 'index.js'];
    // act
    function action() {
      checkArgumentFormat();
    }
    // assert
    expect(action).toThrow(error);
  });

  it('should throw an error if too many arguments are provided', () => {
    // arrange
    const error = errors.TOO_MANY_ARGUMENTS;
    process.argv = ['node', 'index.js', 'foo', 'bar'];
    // act
    function action() {
      checkArgumentFormat();
    }
    // assert
    expect(action).toThrow(error);
  });

  it('should throw an error if starting file does not end with .txt', () => {
    // arrange
    const error = errors.INVALID_FILE_EXTENSION;
    process.argv = ['node', 'index.js', 'foo.bar'];
    // act
    function action() {
      checkArgumentFormat();
    }
    // assert
    expect(action).toThrow(error);
  });
});

describe('checkDuplicateFiles', () => {
  it('should throw an error if a duplicate file is found', () => {
    // arrange
    const file = 'foo.txt';
    const error = errors.DUPLICATE_FILE + file;
    process.argv = ['node', 'index.js', file];
    getLineValues.mockImplementation(() => [file, file]);
    // act
    function action() {
      checkDuplicateFiles();
    }
    // assert
    expect(action).toThrow(error);
  });
});