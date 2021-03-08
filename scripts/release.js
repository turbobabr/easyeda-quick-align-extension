#! /usr/bin/env node
const path = require('path');
const del = require('del');
const Utils = require('./utils');

const buildDownloadFileName = (version) => {

};

const buildDownloadURL = (version) => {
  
}


(() => {
  const outputDir = path.resolve(__dirname,'../releases');
  const packageFilePath =  path.resolve(__dirname,'../package.json');
  
  del.sync(outputDir);
  Utils.createDir(outputDir);

  const package = Utils.readJSON(packageFilePath);
  console.log(package.version);
  
})();

