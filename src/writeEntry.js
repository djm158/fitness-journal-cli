import fs from "fs/promises";
import path from "path";

export const writeEntry = async (config, output) => {
  await fs.appendFile(
    // TODO: extract journal as constant
    path.resolve(
      config.appendFilejournalPath,
      `journal${config.journalExtension}`,
    ),
    `\n\n# ${title}\n\n${Object.keys(output.workouts)
      .map(
        (w) =>
          `### ${w}\n\nDistance: ${output.workouts[w].distance}\n\nDetails: ${output.workouts[w].details}`,
      )
      .join("\n")}`,
  );
};
