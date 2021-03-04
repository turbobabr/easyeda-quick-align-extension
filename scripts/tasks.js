const path = require('path');
const del = require('del');
const Utils = require('./utils');

function clean() {  
  console.log('cleaning!');
  del.sync([path.resolve(__dirname,'../build')]);
}

function copyManifest() {
  console.log('Copying manifest.json file...');

  const srcFilePath = path.resolve(__dirname,'../src/manifest.json');
  if(!Utils.fileExists(srcFilePath)) {
    return;
  }

  const dstFilePath = path.resolve(__dirname,'../build/manifest.json');
  Utils.copyFile(srcFilePath,dstFilePath);  
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

module.exports = {
  clean: clean,
  copyManifest: copyManifest,
  copyLocale: copyLocale,
  copyIcon: copyIcon,
  injectMeta: injectMeta
};