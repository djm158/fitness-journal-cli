import { getBasicDistanceDetails } from "./distance.js";

export async function getRunInfo(w) {
  return await getBasicDistanceDetails(w);
}
