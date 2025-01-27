import { checkbox } from "@inquirer/prompts";
import { getBikeInfo } from "./bike.js";
import { getRunInfo } from "./run.js";
import { getStrengthInfo } from "./strength.js";
import { defaultConfig } from "../config.js";

const promptsFor = {
  // TODO; would be nice to have some type safety here when we add new workout types
  run: getRunInfo,
  bike: getBikeInfo,
  strength: getStrengthInfo,
};

export const getWorkouts = async (options) => {
  if (options.workout) {
    const { workout, ...rest } = options;
    return {
      [workout]: await promptsFor[workout](options.workout, rest),
    };
  }
  const result = {};
  const workouts = await checkbox({
    message: "Workout type?",
    choices: defaultConfig.workoutOptions,
  });

  for (const workoutType of workouts) {
    if (promptsFor[workoutType]) {
      result[workoutType] = await promptsFor[workoutType](workoutType);
    }
  }
  return result;
};
