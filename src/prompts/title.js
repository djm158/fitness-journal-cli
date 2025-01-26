import { input } from "@inquirer/prompts";

export const getTitle = async () => {
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
