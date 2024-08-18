import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const editHandler = () => {
    //bad practice
    //     setIsEditing(!isEditing);

    //good practice
    setIsEditing((currIsEditing) => !currIsEditing);

    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  };

  const onChangeHandler = (event) => {
    setPlayerName(event.target.value);
  };
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={onChangeHandler}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* {isEditing ? (
          <input type="text" disabled></input>
        ) : (
          <span className="player-name">{name}</span>
        )} */}
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
