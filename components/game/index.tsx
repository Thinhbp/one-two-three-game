import React, { useState } from 'react';
import Round from './round';

interface GameProps {
  roomId: string;
}

export enum ROUND_STATUS_LIST {
  CHOOSE_OPTION,
  WAITING_CHOOSE_OPTION,
  SEND_KEY,
  WAITING_RESULT,
  SEE_RESULT,
}

const Game = ({ roomId }: GameProps) => {
  const [currentRound, setCurrentRound] = useState(1);

  return (
    <>
      <Round currentRound={currentRound} setCurrentRound={setCurrentRound} />
    </>
  );
};

export default Game;
