jest.mock('./modules/checks.js', () => ({
  checkArgumentFormat: jest.fn(),
  checkDuplicateFiles: jest.fn()
}));
jest.mock('./modules/text.js', () => ({
  getLineValues: jest.fn(),
  sumLineValuesFromTxt: jest.fn(),
  resultingCountsByFile: []
}));
import { init } from './index.js';
import { checkArgumentFormat, checkDuplicateFiles } from './modules/checks.js';
import { getLineValues, sumLineValuesFromTxt, resultingCountsByFile } from './modules/text.js';

describe('init', () => {
  const file = 'foo.txt';
  process.argv = ['node', 'index.js', file];
  jest.spyOn(resultingCountsByFile, 'unshift');
  jest.spyOn(console, 'info');

  beforeEach(() => {
    jest.resetAllMocks();

    getLineValues.mockImplementation(() => [1, 2]);
    sumLineValuesFromTxt.mockImplementation(() => 3);
  });

  it('should call for checks', () => {
    // act
    init();
    // assert
    expect(checkArgumentFormat).toHaveBeenCalled();
    expect(checkDuplicateFiles).toHaveBeenCalled();
  });

  it('should unshift first file with its count', () => {
    // arrange
    const expectArgs = {[file]: 3};
    // act
    init();
    // assert
    expect(resultingCountsByFile.unshift).toHaveBeenCalledWith(expectArgs);
  });

  it('should output the result', () => {
    // act
    init();
    // assert
    expect(console.info).toHaveBeenCalled();
  });
});