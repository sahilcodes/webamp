// Functions for deriving information from skins

import { exec } from "child_process";
import shellescape from "shell-escape";

export function getColor(imgPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const excapedImgPath = shellescape([imgPath]);
    const command = `convert ${excapedImgPath} -scale 1x1\! -format '%[pixel:u]' info:-`;
    exec(command, (error, stdout) => {
      if (error !== null) {
        reject(error);
        return;
      }
      resolve(stdout.slice(1));
    });
  });
}
