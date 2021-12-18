import React, { useState } from 'react';
import Result from './result';
import Round from './round';

interface GameProps {
  roomId: string;
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
          currentRound={currentRound}
          setCurrentRound={setCurrentRound}
          setGameStatus={setStatus}
        />
      )}

      {status === GAME_STATUS.FINISHED && <Result setGameStatus={setStatus} />}
    </>
  );
};

export default Game;
