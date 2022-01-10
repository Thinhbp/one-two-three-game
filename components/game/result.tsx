import React, { useState, useEffect, useRef } from 'react';
import { useEthers } from '@usedapp/core';
import { useContractV2 } from '@hooks/useContractV2';
import { usePageContext, ACTIONS, PAGES } from '@components/common/page';
import { PLAYER_OPTION_NAMES, ROOM_RESULT } from '@hooks/consts';
import Web3 from 'web3';
import { showAddress } from '@hooks/utils';

interface ResultProps {
  roomId: number;
}

const Result = ({ roomId }: ResultProps) => {
  const [state, dispatch] = usePageContext();

  const { account } = useEthers();

  const { getRoom: getRoomV2 } = useContractV2();

  const [gameData, setGameData] = useState<any>();

  const [status, setStatus] = useState('');

  const loadRoomInterval = useRef<any>();
  const loadRoomIntervalTime = 5000;

  const loadRoom = async () => {
    const result = await getRoomV2(roomId);
    setGameData(result);

    if (result.result === ROOM_RESULT.UNDECIDED) {
      setStatus('Waiting for result...');
    } else if (result.result === ROOM_RESULT.DRAW) {
      setStatus('Draw');
    } else if (
      (result.result === ROOM_RESULT.WINNER_1 &&
        result.Address_1 === account) ||
      (result.result === ROOM_RESULT.WINNER_2 && result.Address_2 === account)
    ) {
      setStatus('You won!');
    } else {
      setStatus('You lost!');
    }
  };

  useEffect(() => {
    loadRoom();
    loadRoomInterval.current = setInterval(loadRoom, loadRoomIntervalTime);

    return () => {
      clearInterval(loadRoomInterval.current);
    };
  }, []);

  const toHomePage = () => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: { page: PAGES.HOME } });
  };

  return (
    <>
      <div className="text-center mt-10">
        <div className="flex-1 min-w-0">
          <header className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-600">Result</h1>
              <h2 className="text-xl font-bold text-orange-700">{status}</h2>
            </div>
          </header>
        </div>

        {gameData && (
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-600">Room Info</h3>
            <p className="mb-2">
              Bet Amount: {Web3.utils.fromWei(gameData.Bet_amount, 'ether')} ETH
            </p>
            <p className="mb-2">
              Player 1: {gameData.Address_1} - Option:{' '}
              {PLAYER_OPTION_NAMES[gameData.choose_1]}
            </p>
            <p>
              Player 2: {gameData.Address_2} - Option:{' '}
              {PLAYER_OPTION_NAMES[gameData.choose_2]}
            </p>
          </div>
        )}

        <button
          className="mt-20 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={toHomePage}
        >
          Home
        </button>
      </div>
    </>
  );
};

export default Result;
