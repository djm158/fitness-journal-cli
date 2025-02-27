import { input } from "@inquirer/prompts";
import fs from "fs/promises";
import path from "path";

import {
  defaultConfig,
  DEFAULT_CONFIG_PATH,
  DEFAULT_CONFIG_FILE,
} from "../config";
import type { WorkoutType } from "../types";

export const promptForConfig = async () => {
  const journalPath = await input({
    message: "Journal path?",
    default: defaultConfig.journalPath,
  });

  const journalExtension = await input({
    message: "Journal extension?",
    default: defaultConfig.journalExtension,
  });

  const workoutOptions = await input({
    message: "Workout options?",
    default: defaultConfig.workoutOptions as unknown as string,
  });

  return {
    journalPath,
    journalExtension,
    workoutOptions: workoutOptions as unknown as WorkoutType[],
  };
};

export const checkForConfig = async () => {
  const hasConfigFile = await fs
    .access(path.resolve(DEFAULT_CONFIG_PATH, DEFAULT_CONFIG_FILE))
    .then(() => true)
    .catch(() => false);

  let config = defaultConfig;

  if (!hasConfigFile) {
    console.log("No config file found, creating one at ", DEFAULT_CONFIG_PATH);

    const { journalPath, journalExtension, workoutOptions } =
      await promptForConfig();

    config = {
      journalPath,
      journalExtension,
      workoutOptions,
    };

    await fs.mkdir(DEFAULT_CONFIG_PATH, { recursive: true });
    await fs.writeFile(
      path.resolve(DEFAULT_CONFIG_PATH, DEFAULT_CONFIG_FILE),
      JSON.stringify(config, null, 2),
    );
  }
};
