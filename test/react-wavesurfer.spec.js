/* global describe, it, jest, expect, beforeEach */

jest.dontMock('../src/react-wavesurfer.js');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const WavesurferComponent = require('../src/react-wavesurfer').default;
global.WaveSurfer = require('../vendor/wavesurfer-bundle.js');

describe('React Wavesurfer component', () => {

  it('should run the tests', () => {
    expect(true).toBe(true);
  });

  it('should render component', () => {
    let wavesurfer = TestUtils.renderIntoDocument(<WavesurferComponent />);
    let component = TestUtils.findRenderedComponentWithType(wavesurfer, WavesurferComponent);
    expect(TestUtils.isElementOfType(component), WavesurferComponent);
  });

});
