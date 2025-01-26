import { input } from "@inquirer/prompts";

export async function getBasicDistanceDetails(w) {
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
