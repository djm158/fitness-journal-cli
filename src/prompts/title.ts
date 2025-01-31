import { input } from "@inquirer/prompts";
import type { Options } from "../types";

export const getTitle = async (options: Options) => {
  if (options.title) {
    return options.title;
  }
  return await input({
    message: "Title?",
    default: new Date()
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-"),
  });
};
