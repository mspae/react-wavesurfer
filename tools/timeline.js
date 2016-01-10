import fs from 'fs';

let output = '';
const searchString = "if (typeof define === 'function' && define.amd) {";
const newDefineStatement = `
        define('wavesurfer', function() {
          return require('wavesurfer.js/dist/wavesurfer.cjs.js');
        });
`;

fs.readFile('./node_modules/wavesurfer.js/plugin/wavesurfer.timeline.js', (err, data) => {
  if (err) {
    throw new Error('Error reading ./node_modules/wavesurfer.js/plugin/wavesurfer.timeline.js', err);
  }
  let indexOfDefine = data.indexOf(searchString);
  output = data.slice(0, indexOfDefine + searchString.length) + newDefineStatement + data.slice(indexOfDefine + searchString.length, data.length);

  fs.writeFile('./vendor/wavesurfer.timeline.js', output, function(err) {
    if (err) {
      throw new Error('Errror writing wavesurfer.timeline.js', err);
    }
    console.log('> Successfully bundled timeline plugin!\n');
  });
});
