import os from "os";
import path from "path";

const homeDir = os.homedir();

const defaultConfigPath = path.resolve(homeDir, ".local/share/fitness-journal");

const DEFAULT_CONFIG_FILE = "config.json";

const defaultConfig = {
  journalPath: path.resolve(homeDir, ".local/share/fitness-journal"),
  journalExtension: ".md",
  workoutOptions: ["Run", "Ride", "Strength", "Flexibility"],
};

export { defaultConfig, defaultConfigPath };
