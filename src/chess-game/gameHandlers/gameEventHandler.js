import JoinOpenGameComponent from "../components/joinOpenGameComponent.js";
import ConfirmJoinGameComponent from "../components/confirmJoinGameComponent.js";
import { gameConstants } from "../helpers/gameConstants.js";

import gameManagerApi from "./gameManagerApi.js";
import MoveToComponent from "../components/moveToMenuComponent.js";
import MoveFromMenuComponent from "../components/moveFromMenuComponent.js";
import moveAction from "../actions/moveAction.js";

const {
  JOIN_GAME_ID,
  NEW_GAME_ID,
  OPEN_GAMES_MENU_ID,
  JOIN_GO_BACK_BUTTON_ID,
  JOIN_GAME_BUTTON_ID,
  MOVE_FROM_MENU,
  MOVE_TO_MENU,
  MOVE_SELECT_GAME_ID,
} = gameConstants;

const { newGame, joinGame } = gameManagerApi;

const coordinatesStack = [];
const idStack = [];

/**
 * @param {import("discord.js").Interaction & {
 *   values: string[];
 *   customId: string;
 *   message: { content: string };
 *   update: (
 *     options: import("discord.js").InteractionUpdateOptions,
 *   ) => Promise<void>;
 *   reply: (
 *     options: import("discord.js").InteractionUpdateOptions | string,
 *   ) => Promise<void>;
 *   options: { getString: (name: string, required?: boolean) => string };
 * }} interaction
 */
const gameEventHandler = async (interaction) => {
  switch (interaction.customId) {
    case NEW_GAME_ID:
      {
        const username =
          interaction.message.content || interaction.user.username;

        newGame(username);
        await interaction.reply("Started a new game");
      }
      break;
    case JOIN_GAME_ID:
      {
        await interaction.update(JoinOpenGameComponent);
      }
      break;
    case OPEN_GAMES_MENU_ID:
      {
        const [gameId] = interaction.values;
        await interaction.update(ConfirmJoinGameComponent(gameId));
      }
      break;
    case JOIN_GAME_BUTTON_ID:
      {
        joinGame({
          gameId: interaction.message.content,
          username: interaction.user.username,
        });
        await interaction.reply(
          `Joined game [id: ${interaction.message.content}]`,
        );
      }
      break;
    case JOIN_GO_BACK_BUTTON_ID:
      {
        await interaction.update(JoinOpenGameComponent);
      }
      break;
    case MOVE_SELECT_GAME_ID:
      {
        const [id] = interaction.values;
        idStack.push(id);
        interaction.update(MoveFromMenuComponent());
      }
      break;
    case MOVE_FROM_MENU:
      {
        const [letter, num] = interaction.values;
        if (/[a-z]/.test(letter) && /[1-8]/.test(num)) {
          coordinatesStack.push(interaction.values.join(""));
          await interaction.update(MoveToComponent());
        } else {
          await interaction.update({
            ...MoveFromMenuComponent(),
            content: "Wrong selection, select one letter and one number",
          });
        }
      }
      break;
    case MOVE_TO_MENU:
      {
        const [letter, num] = interaction.values;
        if (/[a-z]/.test(letter) && /[1-8]/.test(num)) {
          coordinatesStack.push(interaction.values.join(""));
          const username =
            interaction?.options?.getString("custom_username") ||
            interaction.user.username;
          const [id] = idStack;
          const [moveFrom, moveTo] = coordinatesStack;

          await interaction.update({
            content: await moveAction({ moveFrom, moveTo, id, username }),
            components: [],
          });
          idStack.pop();
          coordinatesStack.pop();
          coordinatesStack.pop();
        } else {
          await interaction.update({
            ...MoveToComponent(),
            content: "Wrong selection, select one letter and one number",
          });
        }
      }
      break;
  }
};

export default gameEventHandler;
