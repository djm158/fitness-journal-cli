import fs from "fs/promises";
import path from "path";
import { defaultConfig } from "./config.js";

export const writeEntry = async ({ title, workouts }) => {
  await fs.appendFile(
    // TODO: extract journal as constant
    path.resolve(
      defaultConfig.journalPath,
      `journal${defaultConfig.journalExtension}`,
    ),
    `\n\n# ${title}\n\n${Object.keys(workouts)
      .map(
        (workout) =>
          `### ${workout}\n\nDistance: ${workouts[workout].distance}\n\nDetails: ${workouts[workout].details}`,
      )
      .join("\n")}`,
  );
};
