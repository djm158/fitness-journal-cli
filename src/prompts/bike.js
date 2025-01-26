import { getBasicDistanceDetails } from "./distance.js";

export async function getBikeInfo(w) {
  return await getBasicDistanceDetails(w);
}
