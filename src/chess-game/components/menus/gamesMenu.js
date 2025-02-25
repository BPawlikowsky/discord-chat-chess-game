import {
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} from "@discordjs/builders";

/**
 * @param {{
 *   id: string;
 *   games: import("../../gameHandlers/GamesListItem.js").GamesListItem[];
 * }} param0
 * @returns
 */
const gamesMenu = ({ id, games }) =>
  new SelectMenuBuilder()
    .setCustomId(id)
    .setPlaceholder("Choose a game")
    .addOptions(
      ...games.map((game, index) =>
        new SelectMenuOptionBuilder()
          .setLabel(`Game No.${index}`)
          .setDescription(
            `Players: ${game.getGame().getPlayers().join(", ")}, Player move: ${game.getGame().getPlayers()[game.getGame().getRound().playerIndex]}`,
          )
          .setValue(game.getId()),
      ),
    );
export default gamesMenu;
