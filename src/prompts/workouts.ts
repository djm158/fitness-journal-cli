import { checkbox } from "@inquirer/prompts";
import { getBikeInfo } from "./bike";
import { getRunInfo } from "./run";
import { getStrengthInfo } from "./strength";
import { defaultConfig } from "../config";
import type { Options, WorkoutType } from "../types";

const promptsFor: {
  [k in WorkoutType]: (workout: WorkoutType, options: Options) => Promise<any>;
} = {
  // TODO; would be nice to have some type safety here when we add new workout types
  run: getRunInfo,
  bike: getBikeInfo,
  strength: getStrengthInfo,
  flexibility: async () => {
    return {};
  },
};

export const getWorkouts = async (options: Options = {}) => {
  if (options.workout) {
    const { workout, ...rest } = options;
    return {
      [workout]: await promptsFor[workout](options.workout, rest),
    };
  }
  const result = {};
  const workouts = await checkbox<WorkoutType>({
    message: "Workout type?",
    choices: defaultConfig.workoutOptions,
  });

  for (const workoutType of workouts) {
    if (promptsFor[workoutType]) {
      result[workoutType] = await promptsFor[workoutType](workoutType, {});
    }
  }
  return result;
};
