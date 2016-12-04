const fs = require('fs');
const path = require('path');
const pkg = require('../package');

const dist = path.join(__dirname, '../dist/');
const docs = path.join(__dirname, '../docs/');
const now = new Date();
const banner = `/*!
 * Cropper.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) ${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */

`;

fs.readdirSync(dist).forEach((file) => {
  if (!/\.(js|css)$/.test(file)) {
    return;
  }

  const filePath = path.join(dist, file);
  const fileData = banner + fs.readFileSync(filePath, 'utf8').toString();

  fs.writeFile(filePath, fileData, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Added banner to ${file}.`);

    if (file === 'cropper.js') {
      fs.writeFile(path.join(docs, 'js/', file), fileData, (e) => {
        if (e) {
          throw e;
        }

        console.log(`Copied ${file} to docs/js.`);
      });
    } else if (file === 'cropper.css') {
      fs.writeFile(path.join(docs, 'css/', file), fileData, (e) => {
        if (e) {
          throw e;
        }

        console.log(`Copied ${file} to docs/css.`);
      });
    }
  });
});
