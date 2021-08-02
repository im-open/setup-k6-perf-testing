const os = require('os');
const dotenv = require('dotenv').config();
const installer = require('./installer');

async function run() {
  try {
    let version = dotenv.process.env.VERSION;
    let osArchitecture = dotenv.process.env.ARCH;

    if (!osArchitecture) {
      osArchitecture = 'amd64';
    }

    await installer.getK6(version, osArchitecture);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
