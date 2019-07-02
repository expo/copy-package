import chalk from 'chalk';
import { join, resolve } from './path';
import { spawnSafeSync } from './spawnSafe';
import { detectPackageManager } from './detectPackageManager';
import { writeFileSync, copySync, mkdirpSync } from 'fs-extra';
import { sync as rimraf } from 'rimraf';
import { dirSync } from 'tmp';

export function copyPackage(targetPath, packageName, packageVersion = '*') {
  let tmp = copyPackageToTempDir(packageName, packageVersion);
  copySync(tmp.name, targetPath);
  tmp.removeCallback();
}

export function copyPackageToTempDir(packageName, packageVersion = '*') {
  const tmp = dirSync({ unsafeCleanup: true });
  const targetPath = tmp.name;
  const targetNpmRoot = join(targetPath, 'node_modules');
  const targetPackageJsonPath = join(targetPath, 'package.json');
  const targetPackagePath = join(targetNpmRoot, packageName);
  const packageManager = detectPackageManager(process.cwd());

  try {
    // TODO: let user inject a log callback?
    // console.info(chalk.grey('•'), 'Creating temporary folder');

    // make a blank package.json
    mkdirpSync(targetNpmRoot);
    writeFileSync(
      targetPackageJsonPath,
      JSON.stringify({
        dependencies: {
          [packageName]: packageVersion,
        },
      })
    );

    if (packageManager === 'yarn') {
      // TODO: let user inject a log callback?
      // console.info(
      //   chalk.grey('•'),
      //   `Installing ${packageName}@${packageVersion} with yarn`
      // );
      spawnSafeSync(`yarn`, ['install', '--ignore-engines'], {
        cwd: targetNpmRoot,
      });
    } else {
      // TODO: let user inject a log callback?
      // console.info(
      //   chalk.grey('•'),
      //   `Installing ${packageName}@${packageVersion} with npm`
      // );
      spawnSafeSync(`npm`, ['i'], { cwd: targetNpmRoot });
    }

    // remove nested node_modules just to be safe
    rimraf(join(targetPackagePath, 'node_modules'));

    return {
      name: targetPackagePath,
      removeCallback: tmp.removeCallback,
    };
  } catch (e) {
    console.error(chalk.red('Uh oh'));
    console.log(e);
  }
}
