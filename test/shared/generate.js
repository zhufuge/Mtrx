const fs = require('fs');

const dir = fs.readdirSync('../../src');
dir.forEach((filename) => {
  if (fs.existsSync('../' + filename)) {
    console.log('├─ exist: ' + filename);
    return ;
  }
  let f = fs.openSync('../' + filename, 'w+');
  let name = filename.slice(0, -3);
  fs.writeSync(f,
               `const ${name} = require(\'../src/${name}\');
const assert = require(\'assert\');


describe(\'${name}\', function() {

});`);
  console.log('├─ create: ' + filename);
});

console.log('└─ done.');
