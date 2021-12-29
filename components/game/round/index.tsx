import React, { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import Header from './header';
import Option from './option';
import Status from './status';
import { useContractV2 } from '@hooks/useContractV2';

interface RoundProps {
  currentRound: number;
  setGameStatus: any;
  setCurrentRound: any;
  roomId: number;
}

export enum ROUND_STATUS_LIST {
  CHOOSE_OPTION,
  WAITING_CHOOSE_OPTION,
  SEND_KEY,
  WAITING_SEND_KEY,
  WAITING_RESULT,
  SEE_RESULT,
}

const Round = ({
  currentRound,
  setCurrentRound,
  setGameStatus,
  roomId,
}: RoundProps) => {
  const { account } = useEthers();

  const [secretKey, setSecretKey] = useState('');

  const [selectedOption, setSelectedOption] = useState(-1);

  const [roundStatus, setRoundStatus] = useState(
    ROUND_STATUS_LIST.CHOOSE_OPTION
  );

  const { getRoom: getRoomV2 } = useContractV2();

  const [gameData, setGameData] = useState<any>();

  useEffect(() => {
    getRoomV2(roomId).then((result) => {
      if (!result) return;
      console.log('get room in round', roomId, result);
      setGameData(result);
    });
  }, [roomId]);

  useEffect(() => {
    if (
      gameData &&
      (gameData.Address_1 === account || gameData.Address_2 === account)
    ) {
      setRoundStatus(ROUND_STATUS_LIST.SEND_KEY);
    }
  }, [gameData]);

  return (
    <>
      <Header
        currentRound={currentRound}
        roundStatus={roundStatus}
        roomId={roomId}
      />

      <Option
        roundStatus={roundStatus}
        secretKey={secretKey}
        setSecretKey={setSecretKey}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <Status
        roomId={roomId}
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        roundStatus={roundStatus}
        setRoundStatus={setRoundStatus}
        selectedOption={selectedOption}
        secretKey={secretKey}
        gameData={gameData}
        setGameStatus={setGameStatus}
      />
    </>
  );
};

export default Round;
