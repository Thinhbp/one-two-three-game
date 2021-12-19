import React, { useState } from 'react';
import Result from './result';
import Round from './round';

interface GameProps {
  setPage: any;
  page: any;
}

export enum GAME_STATUS {
  PLAYING,
  FINISHED,
}

const Game = ({ page, setPage }: GameProps) => {
  const [currentRound, setCurrentRound] = useState(1);

  const { roomId } = page;

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

      {status === GAME_STATUS.FINISHED && (
        <Result roomId={roomId} setPage={setPage} />
      )}
    </>
  );
};

export default Game;
