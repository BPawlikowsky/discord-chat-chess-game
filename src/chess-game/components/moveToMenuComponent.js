import {
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} from "@discordjs/builders";
import { gameConstants } from "../helpers/gameConstants.js";

const { MOVE_TO_MENU } = gameConstants;

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
const MoveToComponent = () => {
  /** @type {SelectMenuBuilder & { custom_id: string; type: number }} */
  const menu = new SelectMenuBuilder()
    .setCustomId(MOVE_TO_MENU)
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
  const row = new ActionRowBuilder({
    components: [menu],
    type: 1,
  });

  return {
    content: "Select move to position",
    components: [row],
  };
};

export default MoveToComponent;
