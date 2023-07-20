import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import isWinner from "../../helpers/CheckWinner";
const Grid = ({ numberOfCard }) => {
  const [board, setBoard] = useState(Array(numberOfCard).fill(""));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const play = (index) => {
    if (turn === true) {
      board[index] = "o";
    } else {
      board[index] = "x";
    }
    const win = isWinner(board, turn ? "o" : "x");

    if (win) {
      setWinner(win);
    }
    setBoard([...board]);
    setTurn(!turn);
  };
  const reset = () => {
    setBoard(Array(numberOfCard).fill(""));
    setTurn(true);
    setWinner(null);
  };

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight">Winner is {winner}</h1>
          <button className="reset" onClick={reset}>
            {" "}
            Reset Game
          </button>
        </>
      )}
      <div className="main-grid">
        <h1 className="turn-highlight">Current turn: {turn ? "o" : "x"}</h1>
        <div className="grid">
          {board.map((ele, idx) => (
            <Card
              key={idx}
              gameEnd={winner ? true : false}
              onPlay={play}
              player={ele}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
