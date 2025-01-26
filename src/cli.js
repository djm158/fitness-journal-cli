import { checkbox } from "@inquirer/prompts";
import fs from "fs/promises";
import path from "path";
import { checkForConfig } from "./prompts/config.js";
import { defaultConfig, defaultConfigPath } from "./config.js";
import { writeEntry } from "./writeEntry.js";

import { getTitle } from "./prompts/title.js";
import { program } from "commander";

const output = {
  title,
  workouts: {},
};

program
  .command("add", { isDefault: true })
  .description("Add a new entry")
  .action(async () => {
    await checkForConfig();

    // TODO: check if entry already exists

    const title = await getTitle();

    const workouts = await checkbox({
      message: "Workout type?",
      choices: defaultConfig.workoutOptions,
    });

    for (const workoutType of workouts) {
      if (promptsFor[workoutType]) {
        output.workouts[workoutType] =
          await promptsFor[workoutType](workoutType);
      }
    }
  });

console.log(output);

await writeEntry(config.journalPath, config, output);
