const { env } = process;
export const config = {
  clientId: env.CLIENT_ID,
  token: env.TOKEN,
  guildId: env.GUILD_ID,
};
