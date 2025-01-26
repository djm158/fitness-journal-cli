import { input, checkbox, Separator } from "@inquirer/prompts";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { promptForConfig } from "./prompts/config.js";
import { defaultConfig, defaultConfigPath } from "./config.js";
import { writeEntry } from "./writeEntry.js";

const DEFAULT_CONFIG_FILE = "config.json";

const titlePrompt = {
  message: "Title?",
  default: new Date()
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-"),
};

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

const title = await input(titlePrompt);

// TODO: check if entry already exists

const workouts = await checkbox({
  message: "Workout type?",
  choices: defaultConfig.workoutOptions,
});

const output = {
  title,
  workouts: {},
};

const workoutMap = {
  Run: getRunInfo,
  Bike: getBikeInfo,
  Strength: getStrengthInfo,
};

for (const w of workouts) {
  if (workoutMap[w]) {
    output.workouts[w] = await workoutMap[w](w);
  }
}

console.log(output);

// await writeEntry(config.journalPath, config, output);

async function getBikeInfo(w) {
  return await getBasicDistanceDetails(w);
}

async function getRunInfo(w) {
  return await getBasicDistanceDetails(w);
}

async function getStrengthInfo(w) {
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
  const strengthExercisesInfo = {};
  for (const e of strengthExercises) {
    strengthExercisesInfo[e] = await getStrengthExerciseInfo(e);
  }
}

async function getStrengthExerciseInfo(e) {
  const sets = await input({
    message: `${e} Sets?`,
  });
  const reps = await input({
    message: `${e} Reps?`,
  });
  const weight = await input({
    message: `${e} Weight?`,
  });
  const duration = await input({
    message: `${e} Duration?`,
  });
  return {
    sets,
    reps,
    duration,
    weight,
  };
}

async function getBasicDistanceDetails(w) {
  const distance = await input({
    message: `${w} Distance?`,
  });
  const details = await input({
    message: `${w} Details?`,
  });
  return {
    distance,
    details,
  };
}
