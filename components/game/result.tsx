import React, { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useContractV2 } from '../../hooks/useContractV2';

interface ResultProps {
  setPage: any;
  roomId: number;
}

const Result = ({ setPage, roomId }: ResultProps) => {
  const { account } = useEthers();

  const { getRoom: getRoomV2 } = useContractV2();

  const [gameData, setGameData] = useState<any>();

  const [status, setStatus] = useState('');

  useEffect(() => {
    getRoomV2(roomId).then((result) => {
      if (!result) return;
      console.log('get room in result', roomId, result, account);
      setGameData(result);

      if (result.Result === '0') {
        setStatus('Hòa :|');
      } else if (result[`Address_${result.Result}`] === account) {
        setStatus('Bạn đã thắng :)');
      } else {
        setStatus('Bạn đã thua :(');
      }
    });
  }, [roomId]);

  const toHomePage = () => {
    setPage({ id: 0 });
  };

  return (
    <>
      <div className="text-center mt-20">
        <div className="flex-1 min-w-0">
          <header className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Kết quả: {status}
              </h1>
            </div>
          </header>
        </div>

        <a
          href="#"
          className="mt-20 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={toHomePage}
        >
          Trang chủ
        </a>
      </div>
    </>
  );
};

export default Result;
