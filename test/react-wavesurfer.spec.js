/* global describe, it, jest, expect, beforeEach */

jest.dontMock('../src/react-wavesurfer.js');

const Wavesurfer = require('../src/react-wavesurfer');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('React Wavesurfer component', () => {


  it('should run the tests', () => {
    expect(true).toBe(true);
  });

  it('should render component', () => {
    let wavesurfer = TestUtils.renderIntoDocument(<Wavesurfer></Wavesurfer>);
    //let component = TestUtils.findRenderedComponentWithType(wavesurfer, Wavesurfer);
    //expect(TestUtils.isElementOfType(component), Wavesurfer);
  });

});
