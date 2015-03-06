import {readDoc, assert, find} from './util.js';

describe('README: ', ()=> {
  let doc = readDoc('@readme.html');

  it('has README.', ()=>{
    assert.includes(doc, '[data-s="readme"]', 'JSDoc Cloudy Test');
    assert.includes(doc, '[data-s="readme"]','this is README');
  });
});
