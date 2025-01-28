import { checkForConfig } from "./prompts/config";
import { writeEntry } from "./writeEntry";

import { getTitle } from "./prompts/title";
import { Command, Option } from "commander";
import { getWorkouts } from "./prompts/workouts";
import { defaultConfig } from "./config";

const program = new Command();

program
  .command("add", { isDefault: true })
  .description("Add a new entry")
  .option("-t, --title <title>", "Title of the entry")
  .addOption(
    // TODO: maybe this should be variadic
    new Option("-w, --workout <workout>", "Workout to add").choices(
      defaultConfig.workoutOptions,
    ),
  )
  .option("-d, --details <details>", "Details of the workout")
  .option("-D, --distance <distance>", "Distance of the workout")
  .action(async (options) => {
    // TODO: check to see if https://github.com/tj/commander.js?tab=readme-ov-file#life-cycle-hooks can be used to run this before the action
    await checkForConfig();
    // TODO: check if entry already exists
    const title = await getTitle(options);
    const workouts = await getWorkouts(options);

    console.log(workouts);
    await writeEntry({ title, workouts });
  });

await program.parseAsync(process.argv);
