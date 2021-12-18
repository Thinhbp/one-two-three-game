import React, { useState, useEffect } from 'react';
import { GAME_STATUS } from '..';
import Header from './header';
import Option from './option';
import Status from './status';

interface RoundProps {
  currentRound: number;
  setGameStatus: any;
  setCurrentRound: any;
}

export enum ROUND_STATUS_LIST {
  CHOOSE_OPTION,
  WAITING_CHOOSE_OPTION,
  SEND_KEY,
  WAITING_RESULT,
  SEE_RESULT,
}

const Round = ({
  currentRound,
  setCurrentRound,
  setGameStatus,
}: RoundProps) => {
  // TODO generate key
  const [secretKey, setSecretKey] = useState('');

  const [selectedOption, setSelectedOption] = useState(-1);

  const [roundStatus, setRoundStatus] = useState(
    ROUND_STATUS_LIST.CHOOSE_OPTION
  );

  useEffect(() => {
    // TODO check if last round
    if (roundStatus === ROUND_STATUS_LIST.SEE_RESULT) {
      setGameStatus(GAME_STATUS.FINISHED);
    }
  }, [roundStatus]);

  return (
    <>
      <Header currentRound={currentRound} roundStatus={roundStatus} />

      <Option
        roundStatus={roundStatus}
        setRoundStatus={setRoundStatus}
        secretKey={secretKey}
        setSecretKey={setSecretKey}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <Status
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        roundStatus={roundStatus}
        setRoundStatus={setRoundStatus}
        selectedOption={selectedOption}
        secretKey={secretKey}
      />
    </>
  );
};

export default Round;
