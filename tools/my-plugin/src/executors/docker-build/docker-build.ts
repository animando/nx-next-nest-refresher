import { PromiseExecutor } from '@nx/devkit';
import { DockerBuildExecutorSchema } from './schema';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const targetToPromise = ({
  target,
  projectName,
  version,
  dockerFile,
  cwd,
  isVerbose,
}: {
  target: string | null;
  projectName: string;
  version: string;
  dockerFile: string;
  cwd: string;
  isVerbose: boolean;
}) => {
  const tag = target
    ? `${projectName}-${target}:${version}`
    : `${projectName}:${version}`;
  const args = ['build', '-t', tag, '-f', join(cwd, dockerFile), cwd];
  if (target) {
    args.push(...['--target', target]);
  }
  return new Promise<void>((res, rej) => {
    console.log('running docker with', args);
    const child = spawn('docker', args);

    if (isVerbose) {
      child.stdout.on('data', (data) => {
        console.log(`stdout:\n${data}`);
      });
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    }

    child.on('exit', (code) => {
      if (code !== 0) {
        rej();
      } else {
        res();
      }
    });
    child.on('error', (error) => {
      console.error(error);
      rej(error);
    });
  });
};

const runExecutor: PromiseExecutor<DockerBuildExecutorSchema> = async (
  options,
  ctx
) => {
  const { targets, dockerFile } = options;
  const { projectName, cwd, isVerbose } = ctx;
  if (!projectName) {
    throw Error('Missing project name');
  }

  const file = dockerFile || `apps/${projectName}/Dockerfile`;

  const allTargets = targets ? targets.split(',') : [null];

  const promises = allTargets.map((target) =>
    targetToPromise({
      isVerbose,
      target,
      cwd,
      projectName,
      version: 'alpha',
      dockerFile: file,
    })
  );

  await Promise.all(promises);

  return {
    success: true,
  };
};

export default runExecutor;
