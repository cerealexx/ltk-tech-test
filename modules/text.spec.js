jest.mock('./output.js', () => ({
  warn: jest.fn()
}));
jest.mock('fs');
import { warn } from './output.js';
import { sumLineValuesFromTxt, resultingCountsByFile, getLineValues } from './text.js';
import * as module from './text.js';
import * as fs from 'fs';
import { warnings } from '../constants/warnings.js';
import { errors } from '../constants/errors.js';

beforeEach(() => {
  resultingCountsByFile.length = 0;
  jest.clearAllMocks();
});

describe('getLineValues', () => {
  it('should show a warn if the line has multiple values', () => {
    // arrange
    const line = '1 2 3';
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => line);
    warn.mockImplementation(() => {});
    // act
    getLineValues('foo.txt');
    // assert
    expect(warn).toHaveBeenCalledWith(warnings.MULTIPLE_VALUES + line);
  });

  it('should show an error if the file is not found', () => {
    // arrange
    const file = 'foo.txt';
    const error = new Error('ENOENT');
    error.code = 'ENOENT';
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw error;
    });
    // act
    function action() {
      getLineValues(file);
    }
    // assert
    expect(action).toThrow(errors.FILE_NOT_FOUND + file);
  });

  it('should return line values', () => {
    // arrange
    const line = '1\n2\n3';
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => line);
    // act
    const result = getLineValues('foo.txt');
    // assert
    expect(result).toEqual(['1', '2', '3']);
  });
});

describe('sumLineValuesFromTxt', () => {
  it('should sum all numeric line values', () => {
    // arrange
    const lines = ['1', '2', '3'];
    // act
    const result = sumLineValuesFromTxt(lines);
    // assert
    expect(result).toBe(6);
  });

  it('should detect subfile and sum its own line values', () => {
    // arrange
    const lines = ['1', 'foo.txt', '3'];
    jest.spyOn(module, 'getLineValues').mockImplementation(() => ['2', '3']);
    // act
    const result = sumLineValuesFromTxt(lines);
    // assert
    expect(result).toBe(9);
  });

  it('should push the sum of the file to [resultingCountsByFile] if file was not already there', () => {
    // arrange
    const lines = ['foo.txt', 'foo.txt'];
    jest.spyOn(module, 'getLineValues').mockImplementation(() => ['2', '3']);
    // act
    sumLineValuesFromTxt(lines);
    // assert
    expect(resultingCountsByFile).toEqual([{ "foo.txt": 5 }]);
  });
});



