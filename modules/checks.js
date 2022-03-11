import { errors } from "../constants/errors.js";
import { getLineValues } from "./text.js";

/**
 * Checks for several bad input formats and throws an error if found.
 */
const checkArgumentFormat = () => {
  const mainFile = process.argv[2];
  if (!mainFile) {
    throw errors.MISSING_ARGUMENT;
  } else if (process.argv.length > 3) {
    throw errors.TOO_MANY_ARGUMENTS;
  } else if (!mainFile.endsWith('.txt')) {
    throw errors.INVALID_FILE_EXTENSION;
  }
}

/**
* Checks for duplicate subfiles to avoid infinite loops and throws an error if found.
*/
const checkDuplicateFiles = () => {
  const mainFile = process.argv[2];
  const allFiles = [mainFile];
  const check = (subFile) => {
    getLineValues(subFile).forEach(line => {
      if (line.endsWith('.txt')) {
        if (allFiles.includes(line)) throw errors.DUPLICATE_FILE + subFile;
        allFiles.push(line);
        check(line);
      }
    });
  }
  check(mainFile);
}

export { checkArgumentFormat, checkDuplicateFiles };