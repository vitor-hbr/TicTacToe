import { useContext, useState } from 'react';
import {GameContext} from '../context/GameStateContext';
import '../styles/Board.scss';

export function Board () {
  const { playerTurn, hasStarted, marked, buttonState, restartGame} = useContext(GameContext);

  const [marks, setMarks] = useState([
   { value : ""},
   { value : ""},
   { value : ""},
   { value : ""},
   { value : ""},
   { value : ""},
   { value : ""},
   { value : ""},
   { value : ""},
  ]);

  function play(idx: number){
    let tempMarks = marks;
    tempMarks[idx].value = playerTurn;
    setMarks(tempMarks);
    marked(idx);
  }

  function restart() {
    setMarks([
      { value : ""},
      { value : ""},
      { value : ""},
      { value : ""},
      { value : ""},
      { value : ""},
      { value : ""},
      { value : ""},
      { value : ""},
     ])
     restartGame();
     console.log(marks);
      }

  return (
    <div className="main-container">
      <div className="board-container">
        {marks.map((element, idx) => {
          return (
            <div key={idx} className="mark" onClick={element.value === "" && hasStarted ? () => play(idx): () => {}}>
              <h1 style={{color: element.value === "X" ? "#46dced" : "#7dfb64"}}>{element.value}</h1>
            </div>
          )
        })}
      </div>
        <button className="startgame-button" onClick={restart}>
          {buttonState}
        </button>
    </div>
  )
}