import { PromiseExecutor } from '@nx/devkit';
import { spawn } from 'node:child_process';
import { KubeDeployExecutorSchema } from './schema';

const targetToPromise = ({
  deploymentFile,
}: {
  deploymentFile: string;
  cwd: string;
  isVerbose: boolean;
  projectName: string;
}) => {
  const args = ['apply', '-f', deploymentFile];
  console.log('running kubectl with', args);
  return new Promise<void>((res, rej) => {
    const child = spawn('kubectl', args);

    child.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`${data}`);
    });

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

const runExecutor: PromiseExecutor<KubeDeployExecutorSchema> = async (
  options,
  ctx
) => {
  const { deploymentFile } = options;
  const { projectName, cwd, isVerbose } = ctx;
  if (!projectName) {
    throw Error('Missing project name');
  }

  const file =
    deploymentFile || `apps/${projectName}/deploy-manifest/deployment.yml`;

  await targetToPromise({
    isVerbose,
    cwd,
    projectName,
    deploymentFile: file,
  });

  return {
    success: true,
  };
};

export default runExecutor;
