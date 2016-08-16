require('babel-register')({
  presets: ['es2015-node6', 'stage-1']
});
require('./server/app');
