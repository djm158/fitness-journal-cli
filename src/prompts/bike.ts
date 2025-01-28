import type { WorkoutType } from "../types";
import { getBasicDistanceDetails } from "./distance";

export async function getBikeInfo(workout: WorkoutType) {
  return await getBasicDistanceDetails(workout);
}
