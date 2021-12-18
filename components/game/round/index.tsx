import React, { useState } from 'react';
import Header from './header';
import Option from './option';
import Status from './status';

interface RoundProps {
  currentRound: number;
  setCurrentRound: any;
}

export enum ROUND_STATUS_LIST {
  CHOOSE_OPTION,
  WAITING_CHOOSE_OPTION,
  SEND_KEY,
  WAITING_RESULT,
  SEE_RESULT,
}

const Round = ({ currentRound, setCurrentRound }: RoundProps) => {
  const [secretKey, setSecretKey] = useState('');
  const [selectedOption, setSelectedOption] = useState(-1);

  const [roundStatus, setRoundStatus] = useState(
    ROUND_STATUS_LIST.CHOOSE_OPTION
  );

  return (
    <>
      <Header currentRound={currentRound} />

      <Option
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
      />
    </>
  );
};

export default Round;
