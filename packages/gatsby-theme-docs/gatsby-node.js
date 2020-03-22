const withDefaults = require('./utils/default-options');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();

  //contentPath = 'docs' by default
  const { contentPath } = withDefaults(options);

  //Figure where we are and then append the contentPath to that out the content path

  const dir = path.join(program.directory, contentPath);

  //If directory doesn't exist, create it

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }

  // console.log('contentpath ', contentPath);
  // console.log('program.directory ', program.directory);
  // console.log('dir ', dir);
};
