import { useContext } from 'react';
import './../styles/Scoreboard.scss';
import {GameContext} from '../context/GameStateContext';

export function Scoreboard (){
  const {xWon, oWon, gameState} = useContext(GameContext);

  return (
    <header className="game-header">
      <div className="banner">
        <h2>Tic Tac Toe</h2>
      </div>
      <div className="gamestate">
        <h1 className="score -x">X: {xWon}</h1>
        <h1 className="action">{gameState}</h1>
        <h1 className="score -o">{oWon} :O</h1>
      </div>
    </header>
  );
}