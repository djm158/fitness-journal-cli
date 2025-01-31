import { checkbox, Separator, number } from "@inquirer/prompts";
import chalk from "chalk";
import { ExcerciseTypeConfig } from "../config/strenth-exercises";

type StrengthExerciseDetailsResponse = Partial<
  Record<
    keyof typeof ExcerciseTypeConfig,
    {
      sets?: number;
      reps?: number;
      duration?: number;
      weight?: number;
    }
  >
>;

export async function getStrengthInfo(): Promise<StrengthExerciseDetailsResponse> {
  const strengthExercises = await checkbox<keyof typeof ExcerciseTypeConfig>({
    message: `Strength exercises?`,
    choices: [
      new Separator(chalk.bold("----- Upper Body -----")),
      { value: "BenchPress", name: "Bench Press" },
      { value: "PullUps", name: "Pull Ups" },
      { value: "BicepCurls", name: "Bicep Curls" },
      { value: "TricepExtensions", name: "Tricep Extensions" },
      { value: "PushUps", name: "Push Ups" },
      new Separator(chalk.bold("----- Core -----")),
      { value: "Planks", name: "Planks" },
      { value: "SidePlanks", name: "Side Planks" },
      { value: "FireHydrants", name: "Fire Hydrants" },
      { value: "Bridges", name: "Bridges" },
      { value: "BalanceBoard", name: "Balance Board" },
      { value: "SingleLegDeadlift", name: "Single Leg Deadlift" },
      { value: "DeadBugs", name: "Dead Bugs" },
      { value: "CrabWalks", name: "Crab Walks" },
      { value: "MountainClimbers", name: "Mountain Climbers" },
      { value: "VUps", name: "V-Ups" },
      { value: "Supermans", name: "Supermans" },
      { value: "RussianTwists", name: "Russian Twists" },
      { value: "LegRaises", name: "Leg Raises" },
      { value: "FlutterKicks", name: "Flutter Kicks" },
      { value: "Bicycles", name: "Bicycles" },
      { value: "Crunches", name: "Crunches" },
      new Separator(chalk.bold("----- Lower Body -----")),
      { value: "Squats", name: "Squats" },
      { value: "SingleLegSquats", name: "Single Leg Squats" },
      { value: "Lunges", name: "Lunges" },
      { value: "Deadlifts", name: "Deadlifts" },
      { value: "CalfRaises", name: "Calf Raises" },
      { value: "PistolSquats", name: "Pistol Squats" },
    ],
  });

  const strengthExercisesInfo: StrengthExerciseDetailsResponse = {};
  for (const exercise of strengthExercises) {
    strengthExercisesInfo[exercise] =
      await getStrengthExerciseDetails(exercise);
  }
  return strengthExercisesInfo;
}

const formatExerciseType = (exercise: keyof typeof ExcerciseTypeConfig) => {
  return exercise.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

export async function getStrengthExerciseDetails(
  exercise: keyof typeof ExcerciseTypeConfig,
) {
  const promptConfig = ExcerciseTypeConfig[exercise];
  if (!promptConfig) {
    throw new Error(`No prompt config found for exercise: ${exercise}`);
  }
  let result: Partial<Record<keyof typeof promptConfig, number>> = {};

  const prompts: {
    message: string;
    default: number;
    key: keyof typeof promptConfig;
  }[] = [
    {
      message: `${formatExerciseType(exercise)} Sets?`,
      default: promptConfig.sets.default,
      key: "sets",
    },
    {
      message: `${formatExerciseType(exercise)} Reps?`,
      default: promptConfig.reps.default,
      key: "reps",
    },
    {
      message: `${formatExerciseType(exercise)} Weight?`,
      default: promptConfig.weight.default,
      key: "weight",
    },
    {
      message: `${formatExerciseType(exercise)} Duration?`,
      default: promptConfig.duration.default,
      key: "duration",
    },
  ];
  for (const prompt of prompts) {
    const key = prompt.key;
    if (promptConfig[key].enabled) {
      result[key] = await number({
        message: prompt.message,
        default: prompt.default,
      });
    }
  }

  return result;
}
