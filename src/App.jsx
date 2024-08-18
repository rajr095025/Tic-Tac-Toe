import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function activePlayerFinder(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns?.length > 0 && gameTurns?.[0]?.player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, playersName) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0]?.row][combination[0]?.column];
    const secondSquareSymbol =
      gameBoard[combination[1]?.row][combination[1]?.column];
    const thirdSquareSymbol =
      gameBoard[combination[2]?.row][combination[2]?.column];

    if (
      firstSquareSymbol && // checking truthy because , at start all values are null , so below conditions fails
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playersName[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [
    ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
  ];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  // Here App is the closest ancestor component for both GameBoard and Player Component, so use lifting state up the state which is used by both child(GameBoard and Player)

  const [gameTurns, setGameTurns] = useState([]);

  // we need player name for corresponding symbol, so that we can use wherever required
  const [playersName, setPlayersName] = useState(INITIAL_PLAYERS);

  // here active playe state can found by using game turns itself rather storing separately.
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = activePlayerFinder(gameTurns);

  // because of mutability in js , we can't just directly assign initialGameBoard value to gameBoard
  // const gameBoard = initialGameBoard;

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, playersName);

  let hasDrawn = !winner && gameTurns?.length === 9; // if winner is undefined and game turns length is 9

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = activePlayerFinder(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // as we are controlling everything using single state "gameTurns" , it is simple to handle restart just by setting empty turns array
  function handleRestart() {
    setGameTurns([]);
  }

  function playerNameChangeHandler(playerSymbol, playerName) {
    setPlayersName((prevNames) => ({
      ...prevNames,
      [playerSymbol]: playerName, // we can use square bracket to set value for particular key
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={INITIAL_PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={playerNameChangeHandler}
          />
          <Player
            initialName={INITIAL_PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={playerNameChangeHandler}
          />
        </ol>
        {(winner || hasDrawn) && (
          <GameOver winner={winner} handleRestart={handleRestart} />
        )}
        <GameBoard
          gameBoard={gameBoard}
          handleSelectSquare={handleSelectSquare}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
