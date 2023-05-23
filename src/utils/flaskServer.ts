import { exec } from 'child_process';

const runFlaskServer = async (): Promise<void> => {
  const command = 'python ../server/server.py';
  const options = { cwd: __dirname };

  const child = exec(command, options);
  
  child.stdout?.on('data', (data) => {
    console.log(data);
  });
  
  child.stderr?.on('data', (data) => {
    console.error(data);
  });
  
  child.on('close', (code) => {
    console.log(`[ATi18n]> Flask server exited with code ${code}`);
  });
};

export default runFlaskServer;
