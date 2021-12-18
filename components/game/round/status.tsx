import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ROUND_STATUS_LIST } from '.';

interface StatusProps {
  currentRound: number;
  setCurrentRound: any;
  roundStatus: number;
  setRoundStatus: any;
}

const Status = ({
  currentRound,
  setCurrentRound,
  roundStatus,
  setRoundStatus,
}: StatusProps) => {
  const router = useRouter();

  const submitOption = () => {
    setRoundStatus(ROUND_STATUS_LIST.WAITING_CHOOSE_OPTION);
  };

  const submitSecretKey = () => {
    setRoundStatus(ROUND_STATUS_LIST.WAITING_RESULT);
  };

  const toHomePage = () => {
    router.push('/');
  };

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
          <a
            href="#"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={toHomePage}
          >
            Trang chủ
          </a>
        )}
      </div>
    </>
  );
};

export default Status;
