import fs from 'fs';

let exportingWavesurfer = '';

fs.readFile('./node_modules/wavesurfer.js/dist/wavesurfer.min.js', (err, data) => {
  if (err) {
    throw new Error('Error reading ./node_modules/wavesurfer.js/dist/wavesurfer.min.js', err);
  }
  exportingWavesurfer += data;
  exportingWavesurfer += `
  if (typeof module !== 'undefined') {
    module.exports = WaveSurfer;
  }`;

  fs.writeFile('./vendor/wavesurfer-bundle.js', exportingWavesurfer, function(err) {
    if (err) {
      throw new Error('Errror writing wavesurfer-bundle.js', err);
    }
    console.log('> Successfully bundled wavesurfer!\n');
  });
});
