import os from "os";
import path from "path";
import type { WorkoutType } from "./types";

const homeDir = os.homedir();

const DEFAULT_CONFIG_PATH = path.resolve(
  homeDir,
  ".local/share/fitness-journal",
);

export const DEFAULT_CONFIG_FILE = "config.json";

type Config = {
  journalPath: string;
  journalExtension: string;
  workoutOptions: WorkoutType[];
};

const defaultConfig: Config = {
  journalPath: path.resolve(homeDir, ".local/share/fitness-journal"),
  journalExtension: ".md",
  workoutOptions: ["run", "bike", "strength", "flexibility"],
};

export { defaultConfig, DEFAULT_CONFIG_PATH };
