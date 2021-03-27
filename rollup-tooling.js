import fse from "fs-extra";
import path from "path";

export const copyLocal = config => {
  return {
    name: "rollup-plugin-copy-local",
    writeBundle() {
      const srcPath = `${__dirname}/dist`;
      const destPath = config.destCopyDir;
      const branch = config.branch || "default";

      return new Promise(async (resolve, reject) => {
        const results = await Promise.all([fse.pathExists(srcPath), fse.pathExists(destPath)]);
        if (!results[0] || !results[1]) {
          return reject(`One of the provided paths don't exist: '${srcPath}' or '${destPath}'`);
        }

        await fse.copy(srcPath, path.join(destPath, branch));
        resolve();
      });
    }
  };
};
