import { input } from "@inquirer/prompts";

import { defaultConfig } from "../config.js";

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
