import fs from 'fs';

let output = '';

fs.readFile('./node_modules/wavesurfer.js/plugin/wavesurfer.timeline.js', (err, data) => {
  if (err) {
    throw new Error('Error reading ./node_modules/wavesurfer.js/plugin/wavesurfer.timeline.js', err);
  }
  output += `
  define('wavesurfer', function() {
    return require('wavesurfer.js/dist/wavesurfer.cjs.js');
  });
  `;
  output += data;

  fs.writeFile('./vendor/wavesurfer.timeline.js', output, function(err) {
    if (err) {
      throw new Error('Errror writing wavesurfer.timeline.js', err);
    }
    console.log('> Successfully bundled timeline plugin!\n');
  });
});
