import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ROUND_STATUS_LIST } from '.';
import { useContract } from '../../../hooks/useContract';
import { utils } from 'ethers';

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
}: StatusProps) => {
  const router = useRouter();

  const {
    selectGuessState,
    sendSelectGuess,
    sendInputSecret,
    inputSecretState,
  } = useContract();

  console.log(gameData);

  const submitOption = () => {
    if (selectedOption < 0) {
      return;
    }

    setRoundStatus(ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION);

    // TODO
    sendSelectGuess(roomId, utils.formatBytes32String(hashCode), {
      value: utils.parseEther('0.0001'),
    });
  };

  useEffect(() => {
    if (selectGuessState.status === 'Success') {
      setRoundStatus(ROUND_STATUS_LIST.SEND_KEY);
    }
  }, [selectGuessState]);

  const submitSecretKey = () => {
    if (secretKey.trim() === '') {
      return;
    }

    setRoundStatus(ROUND_STATUS_LIST.WAITING_RESULT);

    sendInputSecret(secretKey, roomId);
  };

  useEffect(() => {
    if (inputSecretState.status === 'Success') {
      setRoundStatus(ROUND_STATUS_LIST.SEE_RESULT);
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

        {roundStatus === ROUND_STATUS_LIST.WAITING_RESULT && (
          <div>Đã gửi key. Đang tính kết quả...</div>
        )}

        {roundStatus === ROUND_STATUS_LIST.SEE_RESULT && (
          <div>123ffffffffffffff</div>
        )}
      </div>
    </>
  );
};

export default Status;
