import { checkbox } from "@inquirer/prompts";
import { getBikeInfo } from "./bike.js";
import { getRunInfo } from "./run.js";
import { getStrengthInfo } from "./strength.js";

const promptsFor = {
  Run: getRunInfo,
  Bike: getBikeInfo,
  Strength: getStrengthInfo,
};

export const getWorkouts = async () => {
  const workouts = await checkbox({
    message: "Workout type?",
    choices: defaultConfig.workoutOptions,
  });

  for (const workoutType of workouts) {
    if (promptsFor[workoutType]) {
      output.workouts[workoutType] = await promptsFor[workoutType](workoutType);
    }
  }
};
