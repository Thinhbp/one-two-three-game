import React, { useEffect, useState } from 'react';
import { utils } from 'ethers';
import { ROUND_STATUS_LIST } from '@hooks/consts';
import { GAME_STATUS } from '..';
import { sha256 } from '@hooks/utils';
import { useContract } from '@hooks/useContract';

interface StatusProps {
  roundStatus: number;
  setRoundStatus: any;
  selectedOption: number;
  secretKey: string;
  roomId: number;
  gameData: any;
  setGameStatus: any;
}

const Status = ({
  roundStatus,
  setRoundStatus,
  selectedOption,
  secretKey,
  roomId,
  gameData,
  setGameStatus,
}: StatusProps) => {
  const { sendHashcode, sendHashcodeState, sendSecret, sendSecretState } =
    useContract();

  const submitOption = () => {
    if (!gameData) return;
    const str = secretKey + selectedOption;
    const hashCode = sha256(str);

    console.log('submit option', roomId, str, hashCode, gameData.Bet_amount);

    sendHashcode(roomId, hashCode, {
      value: utils.parseEther(parseInt(gameData.Bet_amount) / 10 ** 18 + ''),
    });
    setRoundStatus(ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION);
  };

  useEffect(() => {
    if (sendHashcodeState.status === 'Success') {
      setRoundStatus(ROUND_STATUS_LIST.SEND_KEY);
    } else if (sendHashcodeState.status === 'Exception') {
      alert(sendHashcodeState.errorMessage);
      setRoundStatus(ROUND_STATUS_LIST.CHOOSE_OPTION);
    }
  }, [sendHashcodeState]);

  const submitSecretKey = () => {
    if (secretKey.trim() === '') {
      return;
    }

    sendSecret(roomId, secretKey);
    setRoundStatus(ROUND_STATUS_LIST.WAITING_SEND_KEY);
  };

  useEffect(() => {
    if (sendSecretState.status === 'Success') {
      setGameStatus(GAME_STATUS.FINISHED);
    } else if (sendSecretState.status === 'Exception') {
      alert(sendSecretState.errorMessage);
      setRoundStatus(ROUND_STATUS_LIST.SEND_KEY);
    }
  }, [sendSecretState]);

  return (
    <>
      <div className="text-center">
        {roundStatus === ROUND_STATUS_LIST.CHOOSE_OPTION && (
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={submitOption}
          >
            Submit your option
          </button>
        )}

        {roundStatus === ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION && (
          <div>Sent option. Waiting for other player to send option...</div>
        )}

        {roundStatus === ROUND_STATUS_LIST.SEND_KEY && (
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={submitSecretKey}
          >
            Send secret key to confirm your option
          </button>
        )}

        {roundStatus === ROUND_STATUS_LIST.WAITING_SEND_KEY && (
          <div>Waiting both players to send secret keys...</div>
        )}

        {roundStatus === ROUND_STATUS_LIST.WAITING_RESULT && (
          <div>Both players sent secret keys. Waiting for result...</div>
        )}
      </div>
    </>
  );
};

export default Status;
