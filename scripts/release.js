#! /usr/bin/env node
const zipper = require("zip-local");
const path = require('path');
const del = require('del');
const Utils = require('./utils');


const buildDownloadFileName = (version) => {
  return `easyeda-quick-align-${version}.zip`
};

const buildDownloadURL = (version) => {
  return `https://github.com/turbobabr/easyeda-quick-align-extension/releases/download/${version}/${buildDownloadFileName(version)}`;
};


(() => {
  const outputDir = path.resolve(__dirname,'../releases');
  const packageFilePath =  path.resolve(__dirname,'../package.json');
  
  del.sync(outputDir);
  Utils.createDir(outputDir);

  const package = Utils.readJSON(packageFilePath);
  const version = package.version;
  console.log(package.version);

  const outputFileName = buildDownloadFileName(version);
  zipper.sync.zip(path.resolve(__dirname,'../build/')).compress().save(path.join(outputDir,outputFileName));
  console.log('done!');  
})();

