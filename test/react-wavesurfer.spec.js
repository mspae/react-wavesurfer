/* global before, describe, it */

const TestUtils = require('react-addons-test-utils');
const React = require('react');
const expect = require('chai').expect;

const Wavesurfer = require('../src/react-wavesurfer.js');

describe('React Wavesurfer component', () => {
  let component;
  let wavesurfer;

  before(() => {
    let html = <Wavesurfer></Wavesurfer>;
    wavesurfer = TestUtils.renderIntoDocument(html);
    component = TestUtils.findRenderedComponentWithType(wavesurfer, Wavesurfer);
  });

  it('should render component', () => {
    expect(TestUtils.isElementOfType(component), Wavesurfer);
  });

});
