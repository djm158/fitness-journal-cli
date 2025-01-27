import { getBasicDistanceDetails } from "./distance.js";

export async function getRunInfo(workout, options) {
  return await getBasicDistanceDetails(workout, options);
}
