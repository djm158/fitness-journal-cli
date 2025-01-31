type ExerciseConfig = {
  enabled: boolean;
  default: number;
};

export function getExerciseDefaults(config: {
  sets?: Partial<ExerciseConfig> & { default: number };
  reps?: Partial<ExerciseConfig> & { default: number };
  weight?: Partial<ExerciseConfig> & { default: number };
  duration?: Partial<ExerciseConfig> & { default: number };
}) {
  const sets = config.sets
    ? { sets: { enabled: true, ...config.sets } }
    : { sets: { enabled: false, default: 0 } };
  const reps = config.reps
    ? { reps: { enabled: true, ...config.reps } }
    : { reps: { enabled: false, default: 0 } };
  const weight = config.weight
    ? { weight: { enabled: true, ...config.weight } }
    : { weight: { enabled: false, default: 0 } };
  const duration = config.duration
    ? { duration: { enabled: true, ...config.duration } }
    : { duration: { enabled: false, default: 0 } };
  return {
    ...sets,
    ...reps,
    ...weight,
    ...duration,
  };
}

export const ExcerciseTypeConfig = {
  BenchPress: {
    ...getExerciseDefaults({
      sets: { default: 1 },
      reps: { default: 10 },
    }),
  },
  PullUps: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  BalanceBoard: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
    }),
  },
  FireHydrants: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  Bridges: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      duration: { enabled: true, default: 60 },
    }),
  },
  SingleLegDeadlift: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
      weight: { enabled: true, default: 0 },
    }),
  },
  Planks: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      duration: { enabled: true, default: 60 },
    }),
  },
  SidePlanks: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      duration: { enabled: true, default: 30 },
    }),
  },
  RussianTwists: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  LegRaises: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  FlutterKicks: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  Bicycles: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  Crunches: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  Squats: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
      weight: { enabled: true, default: 0 },
    }),
  },
  BicepCurls: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
      weight: { enabled: true, default: 0 },
    }),
  },
  TricepExtensions: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
      weight: { enabled: true, default: 0 },
    }),
  },
  PushUps: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  DeadBugs: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  CrabWalks: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  MountainClimbers: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  VUps: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  Supermans: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  SingleLegSquats: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  Lunges: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  Deadlifts: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
      weight: { enabled: true, default: 0 },
    }),
  },
  CalfRaises: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
  PistolSquats: {
    ...getExerciseDefaults({
      sets: { enabled: true, default: 1 },
      reps: { enabled: true, default: 10 },
    }),
  },
};
