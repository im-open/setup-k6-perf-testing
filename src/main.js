require('dotenv').config();
const core = require('@actions/core');
const os = require('os');
const installer = require('./installer');

async function run() {
  try {
    let extensionZipPath = process.env.EXT_ZIP_PATH;
    let version = process.env.VERSION;
    let osArchitecture = process.env.ARCH;

    if (extensionZipPath === 'none') {
      await installer.installK6Zip(version, osArchitecture, extensionZipPath);
    } else {
      await installer.getK6(version, osArchitecture);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
