/**
 * Performs release-only checks before the publish workflow installs
 * dependencies or builds artifacts.
 *
 * The script treats the root `package.json` as the source of truth for the
 * package version, requires the GitHub release tag to match `v<version>`, and
 * queries npm to ensure that exact version is still available to publish.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.resolve(repoRoot, 'package.json');

/**
 * Accepts the release tag from either an explicit CLI argument or the CI
 * environment so the script works both locally and inside GitHub Actions.
 */
const readReleaseTag = () => {
  const cliTag = process.argv
    .slice(2)
    .find((arg) => arg.startsWith('--tag='))
    ?.slice('--tag='.length);

  return cliTag ?? process.env.RELEASE_TAG ?? process.env.GITHUB_REF_NAME ?? '';
};

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const packageName = packageJson.name;
const packageVersion = packageJson.version;
const releaseTag = readReleaseTag();
const expectedTag = `v${packageVersion}`;

/**
 * Resolves an npm command that can be executed reliably on the current
 * platform. On Windows, direct `npm` process spawning is inconsistent, so the
 * script falls back to npm's CLI entrypoint and runs it through Node instead.
 */
const resolveNpmCommand = () => {
  if (process.env.npm_execpath) {
    return {
      command: process.execPath,
      args: [process.env.npm_execpath, 'view', `${packageName}@${packageVersion}`, 'version', '--json'],
    };
  }

  if (process.platform !== 'win32') {
    return {
      command: 'npm',
      args: ['view', `${packageName}@${packageVersion}`, 'version', '--json'],
    };
  }

  const whereResult = spawnSync('where.exe', ['npm.cmd'], {
    cwd: repoRoot,
    encoding: 'utf8',
  });

  if (whereResult.error || whereResult.status !== 0) {
    console.error("Unable to locate 'npm.cmd' on PATH.");
    if (whereResult.error) {
      console.error(whereResult.error.message);
    }
    process.exit(1);
  }

  const npmPath = whereResult.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  if (!npmPath) {
    console.error("Unable to resolve 'npm.cmd' from where.exe output.");
    process.exit(1);
  }

  const npmCliPath = path.resolve(path.dirname(npmPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');

  if (!existsSync(npmCliPath)) {
    console.error(`Unable to locate npm CLI at '${npmCliPath}'.`);
    process.exit(1);
  }

  return {
    command: process.execPath,
    args: [npmCliPath, 'view', `${packageName}@${packageVersion}`, 'version', '--json'],
  };
};

if (!releaseTag) {
  console.error('Missing release tag. Provide --tag=<tag> or set RELEASE_TAG/GITHUB_REF_NAME.');
  process.exit(1);
}

if (releaseTag !== expectedTag) {
  console.error(`Release tag '${releaseTag}' does not match expected tag '${expectedTag}'.`);
  process.exit(1);
}

const { command: npmCommand, args: npmArgs } = resolveNpmCommand();

const npmViewResult = spawnSync(npmCommand, npmArgs, {
  cwd: repoRoot,
  encoding: 'utf8',
});

if (npmViewResult.error) {
  console.error(`Unable to execute npm to verify availability for '${packageName}@${packageVersion}'.`);
  console.error(npmViewResult.error.message);
  process.exit(1);
}

if (npmViewResult.status === 0) {
  const publishedVersion = (npmViewResult.stdout || '').trim() || packageVersion;
  console.error(`Version '${publishedVersion}' of '${packageName}' is already published on npm.`);
  process.exit(1);
}

const npmOutput = `${npmViewResult.stdout ?? ''}\n${npmViewResult.stderr ?? ''}`;
const versionMissing = /E404|404\s+No match found/i.test(npmOutput);

if (!versionMissing) {
  console.error(`Unable to verify npm availability for '${packageName}@${packageVersion}'.`);
  if (npmOutput.trim()) {
    console.error(npmOutput.trim());
  }
  process.exit(npmViewResult.status ?? 1);
}

console.log(`Release preflight passed for ${packageName}@${packageVersion} using tag '${releaseTag}'.`);
