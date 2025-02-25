import { REST, Routes } from "discord.js";
import { config } from "./config/config.js";
import { commands } from "./commands/index.js";
import Logger from "./chess-game/helpers/logger.js";

const { clientId, guildId, token } = config;

const logger = Logger.getInstance();

const fn = async (commands) => {
  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(token);
  try {
    logger.info(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    /** @type {unknown | any[]} */
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    logger.info(
      `Successfully reloaded ${data["length"]} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};

fn(commands.map((command) => command.data.toJSON()));
