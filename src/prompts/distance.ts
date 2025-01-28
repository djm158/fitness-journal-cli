import { input } from "@inquirer/prompts";
import type { Options } from "../types";

export async function getBasicDistanceDetails(
  workout: string,
  options: Options = {},
) {
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
