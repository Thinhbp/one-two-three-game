import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ROUND_STATUS_LIST } from '.';
import { useContract } from '../../../hooks/useContract';
import { utils } from 'ethers';
import { GAME_STATUS } from '..';

interface StatusProps {
  currentRound: number;
  setCurrentRound: any;
  roundStatus: number;
  setRoundStatus: any;
  selectedOption: number;
  secretKey: string;
  hashCode: string;
  roomId: number;
  gameData: any;
  setGameStatus: any;
}

const Status = ({
  currentRound,
  setCurrentRound,
  roundStatus,
  setRoundStatus,
  selectedOption,
  secretKey,
  hashCode,
  roomId,
  gameData,
  setGameStatus,
}: StatusProps) => {
  const router = useRouter();

  const {
    selectGuessState,
    sendSelectGuess,
    sendInputSecret,
    inputSecretState,
  } = useContract();

  const submitOption = () => {
    if (!gameData) return;
    console.log('submit option', roomId, hashCode, gameData.Bet_amount);

    sendSelectGuess(roomId, hashCode, {
      value: utils.parseEther(gameData.Bet_amount / 10 ** 18 + ''),
    });
    setRoundStatus(ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION);
  };

  useEffect(() => {
    if (selectGuessState.status === 'Success') {
      setRoundStatus(ROUND_STATUS_LIST.SEND_KEY);
    } else if (selectGuessState.status === 'Exception') {
      alert(selectGuessState.errorMessage);
      setRoundStatus(ROUND_STATUS_LIST.CHOOSE_OPTION);
    }
  }, [selectGuessState]);

  const submitSecretKey = () => {
    if (secretKey.trim() === '') {
      return;
    }

    sendInputSecret(secretKey, roomId);
    setRoundStatus(ROUND_STATUS_LIST.WAITING_SEND_KEY);
  };

  useEffect(() => {
    if (inputSecretState.status === 'Success') {
      setGameStatus(GAME_STATUS.FINISHED);
    } else if (inputSecretState.status === 'Exception') {
      alert(inputSecretState.errorMessage);
      setRoundStatus(ROUND_STATUS_LIST.SEND_KEY);
    }
  }, [inputSecretState]);

  return (
    <>
      <div className="text-center">
        {roundStatus === ROUND_STATUS_LIST.CHOOSE_OPTION && (
          <a
            href="#"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={submitOption}
          >
            Submit your option
          </a>
        )}

        {roundStatus === ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION && (
          <div>Đã chọn. Đợi đối thủ trả lời...</div>
        )}

        {roundStatus === ROUND_STATUS_LIST.SEND_KEY && (
          <a
            href="#"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={submitSecretKey}
          >
            Gửi key để giải mã
          </a>
        )}

        {roundStatus === ROUND_STATUS_LIST.WAITING_SEND_KEY && (
          <div>Đang đợi 2 player gửi key...</div>
        )}

        {roundStatus === ROUND_STATUS_LIST.WAITING_RESULT && (
          <div>Cả 2 player đã gửi key. Đang tính kết quả...</div>
        )}
      </div>
    </>
  );
};

export default Status;
