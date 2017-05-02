const fs = require('fs');

const fileContent = (name) => `const ${name} = require(\'../src/${name}\');
const assert = require(\'assert\');


describe(\'${name}\', function() {

});`;

const dir = fs.readdirSync('../');
dir.forEach((filename) => {
  if (!fs.existsSync('../' + filename)) {
    console.log('├─ not exist: ' + filename);
    return ;
  }

  fs.readFile(`../${filename}`, {encoding: 'utf8'}, (err, content) => {
    if (content !== fileContent(filename.slice(0, -3))) return;

    console.log('├─ need to finish: ' + filename);
  });
});

