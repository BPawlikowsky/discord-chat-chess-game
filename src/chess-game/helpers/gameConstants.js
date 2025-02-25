const BLACK = 1;
const WHITE = 0;

const PieceColors = { BLACK, WHITE };

const OPEN = "open";
const CLOSED = "closed";

const GameStatus = { OPEN, CLOSED };

const OPEN_GAMES_MENU_ID = "open_games_menu";
const NEW_GAME_ID = "new_game";
const JOIN_GAME_ID = "join_open";
const JOIN_GAME_BUTTON_ID = "join_game_button";
const JOIN_GO_BACK_BUTTON_ID = "join_go_back";
const MOVE_FROM_MENU = "move_from_menu";
const MOVE_TO_MENU = "move_to_menu";
const MOVE_SELECT_GAME_ID = "move_select_game";

const ComponentCustomIds = {
  OPEN_GAMES_MENU_ID,
  NEW_GAME_ID,
  JOIN_GAME_ID,
  JOIN_GAME_BUTTON_ID,
  JOIN_GO_BACK_BUTTON_ID,
  MOVE_FROM_MENU,
  MOVE_TO_MENU,
  MOVE_SELECT_GAME_ID,
};

const OPENING_POSITIONS =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const gameConstants = {
  ...PieceColors,
  ...GameStatus,
  ...ComponentCustomIds,
  OPENING_POSITIONS,
};
