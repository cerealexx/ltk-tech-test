import * as fs from 'fs';
import * as thisModule from './text.js'; // This helps mocking the module in tests.
import { errors } from '../constants/errors.js';
import { warnings } from '../constants/warnings.js';
import { warn } from '../modules/output.js';

const resultingCountsByFile = [];

/**
* Reads the content of a file and returns an array of its lines.
* If the file has multiple values per line, a warn is shown and only the first one will be used.
* If the file is not found, an error is thrown.
*
* @param {String} filePath - Path to the file to be read.
*/
const getLineValues = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8')
              .split('\n')
              .map(line => {
                const trimmedLine = line.trim();
                const hasSpaces = /\s/.test(trimmedLine);
                if (hasSpaces) warn(warnings.MULTIPLE_VALUES + trimmedLine);
                return trimmedLine;
              })
              .filter(line => line.length > 0);
  } catch (e) {
    throw errors.FILE_NOT_FOUND + filePath;
  }
}

/**
* Sums the values of each line of every file with a single iteration.
* Detects files parsing all the strings as numbers and evaluating NaN.
* Values will be summed until no more subfiles are found.
* 
* @param {Array} lines - Array of line values to be summed (It will automatically iterate over subfile paths).
*/
const sumLineValuesFromTxt = (lines) => {
  return lines.reduce((acc, curr) => {
    const num = parseInt(curr);
    const alreadyAdded = resultingCountsByFile.some(res => Object.keys(res)[0] === curr);

    if (isNaN(num)) {
      if (!alreadyAdded) {
        resultingCountsByFile.push({
          [curr]: sumLineValuesFromTxt(thisModule.getLineValues(curr))
        });
      }
      return acc + sumLineValuesFromTxt(thisModule.getLineValues(curr)) 
    }
    return acc + num;
  }, 0);
}

export { sumLineValuesFromTxt, getLineValues, resultingCountsByFile };