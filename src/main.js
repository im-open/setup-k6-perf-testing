require('dotenv').config();
const core = require('@actions/core');
const os = require('os');
const installer = require('./installer');

async function run() {
  try {
    let version = process.env.VERSION;
    let osArchitecture = process.env.ARCH;
    let extensionDownloadUrl = process.env.EXTENSION_DOWNLOAD_URL;
    // let token = core.getInput('extension-download-token');
    let token = process.env.EXTENSION_DOWNLOAD_TOKEN;

    await installer.getK6(version, osArchitecture, extensionDownloadUrl, token);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
