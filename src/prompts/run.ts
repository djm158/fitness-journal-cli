import type { Options, WorkoutType } from "../types";
import { getBasicDistanceDetails } from "./distance";

export async function getRunInfo(workout: WorkoutType, options: Options) {
  return await getBasicDistanceDetails(workout, options);
}
