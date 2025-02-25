import {
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} from "@discordjs/builders";
import { gameConstants } from "../helpers/gameConstants.js";

const { MOVE_FROM_MENU } = gameConstants;

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];
const numbers = [];

/** @returns {import("discord.js").InteractionUpdateOptions} */
const moveFromMenuComponent = () => {
  const menu = new SelectMenuBuilder()
    .setCustomId(MOVE_FROM_MENU)
    .setMaxValues(2)
    .setMaxValues(2)
    .addOptions(
      letters.map((letter) =>
        new SelectMenuOptionBuilder()
          .setLabel(letter.toUpperCase())
          .setValue(letter),
      ),
    );

  /** @type {ActionRowBuilder & { type: number }} */
  const row = new ActionRowBuilder().addComponents(menu);

  return {
    content: "Select move from position",
    components: [row],
  };
};

export default moveFromMenuComponent;
