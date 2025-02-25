// Require the necessary discord.js classes
import { Events, Client, GatewayIntentBits } from "discord.js";
import { config } from "./config/config.js";
import { initCommands } from "./init-commands.js";
import gameEventHandler from "./chess-game/gameHandlers/gameEventHandler.js";
import Logger from "./chess-game/helpers/logger.js";

const { token } = config;

const logger = Logger.getInstance();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let commands;

client.once(Events.ClientReady, (readyClient) => {
  commands = initCommands();

  logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() || interaction.isStringSelectMenu()) {
    try {
      await gameEventHandler(interaction);
    } catch (e) {
      Logger.getInstance().info(e);
    }
  }
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(token);
