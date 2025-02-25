type GameAsJSON = {
	   id: string;
	   players: string[];
	   round: Round;
	   moves: Moves;
	   gameState: string;
	 }
type Round = 
{ playerIndex: number; roundNumber: number }


type Moves = {
      user: string;
      color: "W" | "B";
      from: string;
      to: string;
      fen: string;
    }[]
	
export {
	GameAsJSON,
	Moves,
	Round
}