import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from '../config.json';
// eslint-disable-next-line camelcase
const { client_id, guild_id, token } = config;

const commands = [];
const commandFiles = fs.readdirSync('src/commands').filter((file) => file.endsWith('.js'));

const loadedCommands = [];

commandFiles.forEach((file) => {
  loadedCommands.push(import(`./commands/${file}`));
});

Promise.all(commands).then((result) => {
  result.forEach((command) => {
    commands.push(command.data.toJSON());
  });
});

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
