import { input } from "@inquirer/prompts";

export async function getBasicDistanceDetails(workout, options) {
  const distance =
    options.distance ??
    (await input({
      message: `${workout} Distance?`,
    }));
  const details =
    options.details ??
    (await input({
      message: `${workout} Details?`,
    }));
  return {
    distance,
    details,
  };
}
