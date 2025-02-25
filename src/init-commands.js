/**
 * @typedef {import("discord.js").SlashCommandBuilder} Builder
 *
 * @typedef {import("discord.js").SlashCommandOptionsOnlyBuilder} BuilderWithOptions
 *
 *
 * @typedef {Builder | BuilderWithOptions} commandData
 */
import { Collection } from "discord.js";
import { commands } from "./commands/index.js";

export const initCommands = () => {
  /**
   * @type {Collection<
   *   string,
   *   {
   *     name: string;
   *     data: commandData;
   *     execute: (
   *       interaction: import("discord.js").ChatInputCommandInteraction,
   *     ) => void;
   *   }
   * >}
   */
  const commandsCollection = new Collection();

  commands.forEach((command) => {
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    commandsCollection.set(command.data.name, command);
  });
  return commandsCollection;
};
