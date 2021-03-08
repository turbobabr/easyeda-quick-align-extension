const path = require('path');
const del = require('del');
const Utils = require('./utils');

function clean() {  
  console.log('cleaning!');
  del.sync([path.resolve(__dirname,'../build')]);
}

function createBuildDir() {
  Utils.createDir(path.resolve(__dirname,'../build'));
}

function copyManifest() {
  console.log('Copying manifest.json file...');

  const packageFilePath = path.resolve(__dirname,'../package.json');
  const package = Utils.readJSON(packageFilePath);
  if(!package) {
    console.warn('Cannot read package.json file!');
    return;
  }

  const srcFilePath = path.resolve(__dirname,'../src/manifest.json');
  if(!Utils.fileExists(srcFilePath)) {
    console.warn('Cannot find manifest.json file!');
    return;
  }

  let manifest = Utils.readJSON(srcFilePath);
  if(!package) {
    console.warn('Cannot read manifest.json file!');
    return;
  }

  manifest = {
    ...manifest,
    description: manifest.description.replace('{{version}}',package.version),
    version: package.version
  };

  const dstFilePath = path.resolve(__dirname,'../build/manifest.json');
  Utils.writeJSON(dstFilePath,manifest);
}

function copyLocale() {
  console.log('Copying locale.txt file...');

  const srcFilePath = path.resolve(__dirname,'../src/locale.txt');
  if(!Utils.fileExists(srcFilePath)) {
    return;
  }

  const dstFilePath = path.resolve(__dirname,'../build/locale.txt');
  Utils.copyFile(srcFilePath,dstFilePath);  
}

function copyIcon() {
  console.log('Copying icon.svg file...');

  const srcFilePath = path.resolve(__dirname,'../src/icon.svg');
  if(!Utils.fileExists(srcFilePath)) {
    return;
  }

  const dstFilePath = path.resolve(__dirname,'../build/icon.svg');
  Utils.copyFile(srcFilePath,dstFilePath);  
}

function injectMeta() {
  console.log('Injecting meta...');
}

function release() {
  console.log('Releasing');
}

module.exports = {
  clean: clean,
  createBuildDir: createBuildDir,
  copyManifest: copyManifest,
  copyLocale: copyLocale,
  copyIcon: copyIcon,
  injectMeta: injectMeta,
  release: release
};