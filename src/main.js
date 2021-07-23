const core = require('@actions/core');
const os = require('os');
const installer = require('./installer');

async function run() {
  try {
    const version = core.getInput('version', { required: true });
    let osArchitecture = core.getInput('architecture');

    if (!osArchitecture) {
      osArchitecture = 'amd64';
    }

    await installer.getK6(version, osArchitecture);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
