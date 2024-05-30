// -*- javascript -*-
const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');

function myExecSync(cmd) {
  console.log(`+ ${cmd}`);
  const output = execSync(cmd, { encoding: 'utf-8' });
  console.log(`${output}`);
  return output;
}

async function run() {
  const context = github.context;

  try {
    if (!context.payload.push) {
      console.log('Not a push. Skipping');
      return;
    }

    const pushData = context.payload.push;

    console.log(`Push: ${pushData}`);

    myExecSync('pwd');

    // the bundle is in the dist sub-directory
    myExecSync(`${__dirname}/../osstrack`);
  } catch (error) {
    core.setFailed("osstrack failed");
    process.exit(1);
  }
}

run();
