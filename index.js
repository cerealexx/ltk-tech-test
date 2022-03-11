import { checkArgumentFormat, checkDuplicateFiles } from './modules/checks.js';
import { sumLineValuesFromTxt, getLineValues, resultingCountsByFile } from './modules/text.js';
import { exitWithError } from './modules/output.js';

const init = () => {
  const mainFile = process.argv[2];

  // CHECK FOR POSSIBLE ERRORS
  checkArgumentFormat();
  checkDuplicateFiles();

  /* 
  Unshift makes sure the main file is added to the results, 
  triggering at the same time the recursive search inside its lines.
  */
  resultingCountsByFile.unshift({
    [mainFile]: sumLineValuesFromTxt(getLineValues(mainFile))
  });

  // OUTPUT
  console.info(resultingCountsByFile);
}

try {
  init();
} catch (e) {
  exitWithError(e);
}

export { init }; // for testing