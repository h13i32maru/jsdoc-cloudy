import {readDoc, assert, find} from './util.js';

describe('README: ', ()=> {
  let doc = readDoc('@readme.html');

  it('has README.', ()=>{
    assert.includes(doc, '[data-ice="readme"]', 'JSDoc Cloudy Test');
    assert.includes(doc, '[data-ice="readme"]','this is README');
  });
});
