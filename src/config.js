import os from "os";
import path from "path";

const homeDir = os.homedir();

const DEFAULT_CONFIG_PATH = path.resolve(
  homeDir,
  ".local/share/fitness-journal",
);

export const DEFAULT_CONFIG_FILE = "config.json";

const defaultConfig = {
  journalPath: path.resolve(homeDir, ".local/share/fitness-journal"),
  journalExtension: ".md",
  workoutOptions: ["run", "bike", "strength", "flexibility"],
};

export { defaultConfig, DEFAULT_CONFIG_PATH };
