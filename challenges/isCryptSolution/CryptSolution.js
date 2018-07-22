class CryptSolution {
  constructor (crypt, solution) {
    this.crypt = crypt;
    this.solution = solution;
    let [ left, right, sum ] = crypt;

    this.left = this.decode(left, solution);
    this.right = this.decode(right, solution);
    this.sum = this.decode(sum, solution);
    this.result = {
      error: {},
      stdout: '',
      stderr: ''
    };
  }

  isSolution () {
    return this.isEqual()
       && (this.areSingleDigits()
       || this.startWithLeadingZeros());
  }

  mapLetterToNum (letter) {
    return this.solution.find((sol) => {
      return (sol[0] === letter);
     })[1];
  }

  decode (str, solution) {
    let num = [];
    for(let i = 0; i < str.length; i++) {
      num.push(this.mapLetterToNum(str.charAt(i)));
    }
    return num.join("");
  }

  isEqual () {
    let { left, right, sum } = this;
    return (parseInt(left) + parseInt(right) === parseInt(sum))
    }
  startWithLeadingZeros() {
      let { left, right } = this;
      return !left.startsWith('0') && !right.startsWith('0');
  }

  areSingleDigits() {
    let { left, right } = this;
    return left.length === 1 && right.length === 1;
  }

  static run (done) {
    console.log('run start');
    const exec = require('child_process').exec;
    return exec('npm run test -t challenges/isCryptSolution/__tests__ ',
    (error, stdout, stderr) => {
        console.log('run done');
        console.log(`${stdout}`);
        console.log(`${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
        return done(null, {
          error,
          stdout,
          stderr
        });
    });
  }
}

module.exports = CryptSolution;
