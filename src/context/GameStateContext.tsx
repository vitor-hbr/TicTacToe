import {createContext, ReactNode, useEffect, useState} from 'react';

interface GameContextData {
  hasStarted: boolean;
  playerTurn: string;
  board: string;
  xWon: number;
  oWon: number;
  gameState: string;
  buttonState: string;
  marked: (index: number) => void;
  startGame: () => void;
  restartGame: () => void;
}

interface GameProviderProps {
  children: ReactNode;
}

export const GameContext = createContext({} as GameContextData);

export function GameProvider({children} : GameProviderProps){
  const [hasStarted, setHasStarted] = useState(false);
  const [playerTurn, setPlayerTurn] = useState("");
  const [board, setBoard] = useState("000000000");
  const [xWon,setXWon] = useState(0);
  const [oWon,setOwon] = useState(0);
  const [gameState, setGameState] = useState("Press the button to Start the game");
  const [buttonState, setButtonState] = useState("Start Game");

  const winningPos = [
    "CCC000000",
    "C00C00C00",
    "0C00C00C0",
    "00C00C00C",
    "C000C000C",
    "00C0C0C00",
    "000CCC000",
    "000000CCC"
  ];

  function playerWon() {
    if(playerTurn === "X"){
      setXWon(xWon + 1);
    } else {
      setOwon(oWon + 1);
    }
    console.log("won");
    setGameState(`${playerTurn} Won!`);
    setHasStarted(false);
  }

  function marked(index: number) {
    let gameString = [...board];
    gameString[index] = playerTurn;
    setBoard(gameString.join(""));
  }

  function startGame() {
    let randomPlayer = Math.floor(Math.random() * 2);
    if(randomPlayer === 0) {
      setPlayerTurn("X");
    } else {
      setPlayerTurn("O");
    }
    setHasStarted(true);
  }

  function restartGame() {
    setBoard("000000000");
    startGame();
  }

  useEffect(()=> {
      console.log(board);
      winningPos.every(winningString => {
        let count = 0;
        for(let charPosition = 0; charPosition < 9; charPosition++) {
            if(winningString[charPosition] !== "0" && board[charPosition] === playerTurn) {
              count++;
            }
        }
        if(count === 3) {
          playerWon();
          return false;
        } else {
          if(board.search("0") === -1){
            setGameState("Draw!");
            setHasStarted(false);
            setPlayerTurn("");
          } else {
            if(playerTurn === "O") {
              setPlayerTurn("X");
            } else {
              setPlayerTurn("O");
            }
          }
        }
        return true;
      });
  }, [board])

  useEffect(() => {
    if(hasStarted) {
      setGameState(`${playerTurn}'s Turn`);
    } 
  }, [playerTurn, hasStarted])

  useEffect(() => {
    if(hasStarted) {
      setButtonState("Restart Game");
    } else {
      setButtonState("Start Game");
    }
  }, [hasStarted])

  return (
    <GameContext.Provider
      value={{
        hasStarted,
        playerTurn, 
        board,
        xWon, 
        oWon,
        gameState,
        buttonState,
        marked,
        startGame,
        restartGame
      }}>
        {children}
      </GameContext.Provider>
  )

}