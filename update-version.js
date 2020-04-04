const fs = require('fs');

const package = require('./package.json');
const packageLock = require('./package-lock.json');

package.version = package.version
  .split('.')
  .map((v, i, arr) => (i === arr.length - 1 ? Number(v) + 1 : v))
  .join('.');

packageLock.version = package.version;

fs.writeFileSync('package.json', JSON.stringify(package, null, 4));
fs.writeFileSync('package-lock.json', JSON.stringify(packageLock, null, 4));
