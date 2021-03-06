require('dotenv').config();
const core = require('@actions/core');
const os = require('os');
const installer = require('./installer');

async function run() {
  try {
    let version = process.env.VERSION;
    let osArchitecture = process.env.ARCH;

    await installer.getK6(version, osArchitecture);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
