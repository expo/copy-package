#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { copyPackage } = require('../dist/index.js');

let packageInfo = process.argv[2];
let targetPath = process.argv[3];

if (!packageInfo) {
  console.error(
    chalk.red(
      'Need to provide a package name, eg: expo-template-bare-minimum@^33.0.0'
    )
  );
}

let packageName;
let packageVersion = '*';

if (packageInfo.includes('@')) {
  let packageParts = packageInfo.split('@');
  packageName = packageParts[0];
  packageVersion = packageParts[1];
} else {
  packageName = packageInfo;
}

if (!targetPath) {
  targetPath = path.join(process.cwd(), packageName);
} else {
  targetPath = path.resolve(targetPath);
}
// console.log({
//   packageName,
//   packageVersion,
//   targetPath,
// })

fs.mkdirpSync(targetPath);
copyPackage(targetPath, packageName, packageVersion);
