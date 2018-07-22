import fs from 'fs';
import path from 'path';
import each from 'jest-each';
import CryptSolution from './../CryptSolution';

let testParams = fs.readFileSync(path.join(__dirname, './../fixtures.json'), 'utf8');
testParams = JSON.parse(testParams);

describe('tests the challenge', () => {
  let cryptSolution;

    each(testParams).it(
      'returns true if %j is a proper crypt solution',
        (testParam) => {
          let { crypt, solution, answer } = testParam;
          cryptSolution = new CryptSolution(crypt, solution);
          expect(cryptSolution.crypt).toEqual(crypt);
          expect(cryptSolution.isSolution()).toBe(answer);
  });
/*  it('should run tests and save its output', (done)=> {
    CryptSolution.run((error, result) => {
        console.log('run  test done');
      expect(result).toBe({
        error: null,
        stdout: expect.any(String),
        stderr: expect.any(String)
      });
      done();
    });
  }); */
});
