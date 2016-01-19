/* global describe, it, jest, expect, beforeEach, spyOn */

jest.dontMock('../src/react-wavesurfer.js');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Wavesurfer = require('../src/react-wavesurfer').default;

describe('component basics', () => {
  let mountedComponent, component;

  beforeEach(() => {
    mountedComponent = TestUtils.renderIntoDocument(<Wavesurfer />);
    component = TestUtils.findRenderedComponentWithType(mountedComponent, Wavesurfer);
  });

  it('should render component', () => {
    expect(TestUtils.isElementOfType(component), Wavesurfer);
  });

  it('should have a wavesurfer.js instance', () => {
    expect(component._wavesurfer).toBeDefined();
  });
});

describe('wavesurfer.js callbacks', () => {
  let callbacks, wavesurfer, component;
  beforeEach(() => {
  });

  it('should trigger callbacks', () => {
    callbacks = {
      handleReady: (e) => {
        console.log('done', e);
      }
    };
    spyOn(callbacks, 'handleReady');
    wavesurfer = TestUtils.renderIntoDocument(<Wavesurfer onReady={callbacks.handleReady} />);
    component = TestUtils.findRenderedComponentWithType(wavesurfer, Wavesurfer);
    component._wavesurfer.on('ready', callbacks.handleReady);
    component._wavesurfer.fireEvent('ready');
    //callbacks.handleReady();
    console.log(component._wavesurfer);
    expect(callbacks.handleReady).toHaveBeenCalled();
  });
});
