function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((turn) => (
        <li key={`${turn?.square?.row}${turn?.square?.col}`}>
          {turn?.player} Selected {turn?.square?.row} {turn?.square?.col}
        </li>
      ))}
    </ol>
  );
}

export default Log;
