import React, { useState } from 'react';
import Result from './result';
import Round from './round';

interface GameProps {
  roomId: number;
}

export enum GAME_STATUS {
  PLAYING,
  FINISHED,
}

const Game = ({ roomId }: GameProps) => {
  const [currentRound, setCurrentRound] = useState(1);

  const [status, setStatus] = useState(GAME_STATUS.PLAYING);

  return (
    <>
      {status === GAME_STATUS.PLAYING && (
        <Round
          roomId={roomId}
          currentRound={currentRound}
          setCurrentRound={setCurrentRound}
          setGameStatus={setStatus}
        />
      )}

      {status === GAME_STATUS.FINISHED && <Result roomId={roomId} />}
    </>
  );
};

export default Game;
