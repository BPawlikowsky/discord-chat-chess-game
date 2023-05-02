// Require the necessary discord.js classes
import { readdirSync } from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import config from '../config.json';
// eslint-disable-next-line camelcase
const { token } = config;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

client.commands = new Collection();
const commandFiles = readdirSync('src/commands').filter((file) => file.endsWith('.js'));

const commands = [];

commandFiles.forEach((file) => {
  commands.push(import(`./commands/${file}`));
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
});

Promise.all(commands).then((result) => {
  result.forEach((command) => client.commands.set(command.data.name, command));
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);
