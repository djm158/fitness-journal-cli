import { checkbox, input, Separator } from "@inquirer/prompts";
import chalk from "chalk";

export async function getStrengthInfo() {
  const strengthExercises = await checkbox({
    message: `Strength exercises?`,
    choices: [
      new Separator(chalk.bold("----- Upper Body -----")),
      { value: "Bench Press" },
      { value: "Pull Ups" },
      { value: "Bicep Curls" },
      { value: "Tricep Extensions" },
      { value: "Push Ups" },
      new Separator(chalk.bold("----- Core -----")),
      { value: "Planks" },
      { value: "Side Planks" },
      { value: "Fire Hydrants" },
      { value: "Balance Board" },
      { value: "Single Leg Deadlift" },
      { value: "Dead Bugs" },
      { value: "Crab Walks" },
      { value: "Mountain Climbers" },
      { value: "V-Ups" },
      { value: "Supermans" },
      { value: "Russian Twists" },
      { value: "Leg Raises" },
      { value: "Flutter Kicks" },
      { value: "Bicycles" },
      { value: "Crunches" },
      new Separator(chalk.bold("----- Lower Body -----")),
      { value: "Squats" },
      { value: "Single Leg Squats" },
      { value: "Lunges" },
      { value: "Deadlifts" },
      { value: "Calf Raises" },
      { value: "Pistol Squats" },
    ],
  });

  // TODO: better types
  const strengthExercisesInfo: { [key: string]: any } = {};
  for (const exercise of strengthExercises) {
    strengthExercisesInfo[exercise] = await getStrengthExerciseInfo(exercise);
  }
  return strengthExercisesInfo;
}

export async function getStrengthExerciseInfo(exercise: string) {
  const sets = await input({
    message: `${exercise} Sets?`,
  });
  const reps = await input({
    message: `${exercise} Reps?`,
  });
  const weight = await input({
    message: `${exercise} Weight?`,
  });
  const duration = await input({
    message: `${exercise} Duration?`,
  });
  return {
    sets,
    reps,
    duration,
    weight,
  };
}
