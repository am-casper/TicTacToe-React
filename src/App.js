import { useState } from "react";

function Square({ val, onClick, Color }) {
  let className;
  if (Color === "white") {
    className = "square-white";
  } else if (Color === "yellow") {
    className = "square-yellow";
  }
  return (
    <button className={className} onClick={onClick}>
      {val}
    </button>
  );
}
function Board({ squares, isXnext, onClick, winner, color }) {
  function _onSqClick(i) {
    let nextSq = squares.slice();
    if (squares[i] || winner) return;
    if (isXnext) {
      nextSq[i] = "X";
    } else {
      nextSq[i] = "O";
    }
    onClick(nextSq, i);
  }

  return (
    <>
      <div className="board-row">
        <Square
          val={squares[0]}
          onClick={() => _onSqClick(0)}
          Color={color[0]}
        />
        <Square
          val={squares[1]}
          onClick={() => _onSqClick(1)}
          Color={color[1]}
        />
        <Square
          val={squares[2]}
          onClick={() => _onSqClick(2)}
          Color={color[2]}
        />
      </div>
      <div className="board-row">
        <Square
          val={squares[3]}
          onClick={() => _onSqClick(3)}
          Color={color[3]}
        />
        <Square
          val={squares[4]}
          onClick={() => _onSqClick(4)}
          Color={color[4]}
        />
        <Square
          val={squares[5]}
          onClick={() => _onSqClick(5)}
          Color={color[5]}
        />
      </div>
      <div className="board-row">
        <Square
          val={squares[6]}
          onClick={() => _onSqClick(6)}
          Color={color[6]}
        />
        <Square
          val={squares[7]}
          onClick={() => _onSqClick(7)}
          Color={color[7]}
        />
        <Square
          val={squares[8]}
          onClick={() => _onSqClick(8)}
          Color={color[8]}
        />
      </div>
    </>
  );
}
export default function Game() {
  const [sq, setSq] = useState([Array(9).fill(null)]);
  const [isXnext, setisXNext] = useState(true);
  const [history, setHistory] = useState(sq);
  const [moveCell, setMoveCell] = useState(Array(9).fill(""));
  const [isToggled, toggle] = useState(false)
  let color = Array(9).fill("white");
  const currentSquares = sq[sq.length - 1];
  let gamelist = history.map((_sq, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move + moveCell.at(move);
    } else {
      description = "Go to game start.";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  function  historyList(state) {
    if(state) {
      console.log("Hi")
      return (<ol>{gamelist.reverse()}</ol>)}
    return (<ol>{gamelist}</ol>)
  }
  function jumpTo(move) {
    setisXNext(move % 2 == 0);
    setSq(history.slice(0, move + 1));
  }
  function onBoardClick(nextSq, i) {
    let NextSq = [...sq, nextSq];
    setSq(NextSq);
    setisXNext(!isXnext);
    setHistory(NextSq);

    let move = 0;
    for (let j = 0; j < nextSq.length; j++) {
      if (nextSq[j]) move++;
    }
    let cell = moveCell.slice();
    cell[move] = "(".concat(parseInt(i / 3) + 1, ",", (i % 3) + 1, ")");
    setMoveCell(cell);
  }
  function winner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        color[a] = color[b] = color[c] = "yellow";
        return squares[a];
      }
    }
    return null;
  }
  let text;
  if (winner(currentSquares)) {
    text = "Winner is " + winner(currentSquares);
  } else if (!winner(currentSquares) && sq.length == 10) {
    text = "Game is Drawn";
  } else if (isXnext) {
    text = "Next move is X";
  } else {
    text = "Next move is O";
  }
  let moveText = () => {
    let text = "You are at move #".concat(sq.length);
    return { text };
  };
  const callback = () => {
    toggle(!isToggled)
}
  return (
    <>
      <div>{moveText}</div>
      <div className="status">{text}</div>
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            isXnext={isXnext}
            onClick={onBoardClick}
            winner={winner(currentSquares)}
            color={color}
          />
        </div>
        <div className="game-info">
          {historyList(isToggled)}
        </div>
        <label>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span />
            <strong>Reverse History</strong>
        </label>
      </div>
    </>
  );
}
