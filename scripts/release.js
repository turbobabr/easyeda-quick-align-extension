#! /usr/bin/env node
const zipper = require("zip-local");
const path = require('path');
const del = require('del');
const Utils = require('./utils');


const buildArchiveFileName = (version) => {
  return `easyeda-quick-align-${version}.zip`
};

const buildDownloadURL = (version) => {
  return `https://github.com/turbobabr/easyeda-quick-align-extension/releases/download/v${version}/${buildArchiveFileName(version)}`;
};

(() => {
  const outputDir = path.resolve(__dirname,'../releases');
  const packageFilePath =  path.resolve(__dirname,'../package.json');
  
  // Clean-up
  del.sync(outputDir);
  Utils.createDir(outputDir);

  const package = Utils.readJSON(packageFilePath);  
  const archiveFileName = buildArchiveFileName(package.version);

  // Updating README.md  
  const readmeTemplateFilePath = path.resolve(__dirname,'../README.template.md');
  const readmeOutputFilePath = path.resolve(__dirname,'../README.md');  
  const readmeContents = Utils.readAndReplaceTextFile(readmeTemplateFilePath, {
    downloadFileName: archiveFileName,
    downloadUrl: buildDownloadURL(package.version)
  });

  Utils.writeFile(readmeOutputFilePath,readmeContents);

  // Zipping the entire thing
  zipper.sync.zip(path.resolve(__dirname,'../build/')).compress().save(path.join(outputDir,archiveFileName));
  console.log('done!');  
})();

