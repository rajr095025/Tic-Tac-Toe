import { useState } from "react";

// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

function GameBoard({ /*gameTurns,*/ gameBoard, handleSelectSquare }) {
  //   const gameBoard = initialGameBoard;
  // Log Component also same information of which row and col has which symbol, we are storing both info in closest ancestor App and single state.
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((previousGameBoard) => {
  //       // Bad practice
  //       //       previousGameBoard[rowIndex][colIndex] = "X";
  //       //       return previousGameBoard;

  //       // Good Practice
  //       const updatedBoard = [...previousGameBoard].map((innerArray) => [
  //         ...innerArray,
  //       ]);
  //       updatedBoard[rowIndex][colIndex] = activePlayer;
  //       return updatedBoard;
  //     });

  //     onActiveChange();
  //   }
  //   for (const turn of gameTurns) {
  //     const { square, player } = turn;
  //     const { row, col } = square;

  //     gameBoard[row][col] = player;
  //   }
  return (
    <>
      <ol id="game-board">
        {gameBoard?.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row?.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => handleSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}

export default GameBoard;
