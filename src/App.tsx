import React from 'react';
import './styles/global.scss';
import {Scoreboard} from './components/Scoreboard';
import {Board} from './components/Board';

import {Footer} from './components/Footer';
import {GameProvider} from './context/GameStateContext'; 

function App() {
  return (
    <GameProvider>
      <div className="container">
        <Scoreboard/>
        <Board/>
        <Footer/>
      </div>
    </GameProvider>
  );
}

export default App;
