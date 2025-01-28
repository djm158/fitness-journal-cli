export type Options = {
  title?: string;
  workout?: WorkoutType;
  distance?: string;
  details?: string;
};

export type WorkoutType = "run" | "bike" | "strength" | "flexibility";
