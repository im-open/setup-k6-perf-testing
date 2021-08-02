const os = require('os');
require('dotenv').config();
const installer = require('./installer');

async function run() {
  try {
    let version = process.env.VERSION;
    let osArchitecture = process.env.ARCH;

    if (!osArchitecture) {
      osArchitecture = 'amd64';
    }

    await installer.getK6(version, osArchitecture);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
