import { input, checkbox } from "@inquirer/prompts";
import fs from "fs/promises";
import path from "path";
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
let journalPath = defaultConfig.journalPath;

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

for (const w of workouts) {
  if (w === "Run") {
    const distance = await input({
      message: `Distance for ${w}?`,
    });
    details = await input({
      message: `Details for ${w}?`,
    });
    output.workouts[w] = {
      distance,
      details,
    };
  }
}

console.log(output);

await writeEntry(config.journalPath, config, output);
