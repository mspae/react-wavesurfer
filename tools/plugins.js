import fs from 'fs';

// Regions
fs.readFile('./node_modules/wavesurfer.js/plugin/wavesurfer.regions.js', (err, data) => {
  if (err) {
    throw new Error('Error reading ./node_modules/wavesurfer.js/plugin/wavesurfer.regions.js', err);
  }

  const before = `
    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
        define(['wavesurfer'], factory);
      } else {
        root.WaveSurfer.Timeline = factory(root.WaveSurfer);
      }
    }(this, function (WaveSurfer) {
  `;
  const after = `
      return WaveSurfer;
    }));
  `;
  const output = before + data + after;

  fs.writeFile('./vendor/wavesurfer.regions.js', output, function(err) {
    if (err) {
      throw new Error('Errror writing wavesurfer.regions.js', err);
    }
    console.log('> Successfully bundled regions plugin!\n');
  });
});
