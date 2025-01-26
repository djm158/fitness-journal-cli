import { input } from "@inquirer/prompts";
import fs from "fs/promises";

import {
  defaultConfig,
  defaultConfigPath,
  DEFAULT_CONFIG_FILE,
} from "../config.js";

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
    default: defaultConfig.workoutOptions,
  });

  return {
    journalPath,
    journalExtension,
    workoutOptions,
  };
};

export const checkForConfig = async () => {
  const hasConfigFile = await fs
    .access(path.resolve(defaultConfigPath, DEFAULT_CONFIG_FILE))
    .then(() => true)
    .catch(() => false);

  let config = defaultConfig;

  if (!hasConfigFile) {
    console.log("No config file found, creating one at ", defaultConfigPath);

    const { journalPath, journalExtension, workoutOptions } =
      await promptForConfig();

    config = {
      journalPath,
      journalExtension,
      workoutOptions,
    };

    await fs.mkdir(defaultConfigPath, { recursive: true });
    await fs.writeFile(
      path.resolve(defaultConfigPath, DEFAULT_CONFIG_FILE),
      JSON.stringify(config, null, 2),
    );
  }
};
