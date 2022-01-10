import React, { useState, useEffect, useRef } from 'react';
import { useEthers } from '@usedapp/core';
import Header from './header';
import Option from './option';
import Status from './status';
import { useContractV2 } from '@hooks/useContractV2';
import Web3 from 'web3';
import { ROOM_STATUS, ROUND_STATUS_LIST } from '@hooks/consts';
import { usePageContext, ACTIONS, PAGES } from '@components/common/page';
import { GAME_STATUS } from '..';
interface RoundProps {
  setGameStatus: any;
  roomId: number;
}

const Round = ({ setGameStatus, roomId }: RoundProps) => {
  const { account } = useEthers();

  const [state, dispatch] = usePageContext();

  const [loaded, setLoaded] = useState(false);

  const [secretKey, setSecretKey] = useState('');

  const [selectedOption, setSelectedOption] = useState(-1);

  const [roundStatus, setRoundStatus] = useState(
    ROUND_STATUS_LIST.CHOOSE_OPTION
  );

  const { getRoom: getRoomV2 } = useContractV2();

  const [gameData, setGameData] = useState<any>();

  const loadRoomInterval = useRef<any>();
  const loadRoomIntervalTime = 5000;

  const loadRoom = async () => {
    const result = await getRoomV2(roomId);
    setLoaded(true);
    setGameData(result);
  };

  useEffect(() => {
    loadRoom();
    loadRoomInterval.current = setInterval(loadRoom, loadRoomIntervalTime);

    return () => {
      clearInterval(loadRoomInterval.current);
    };
  }, []);

  useEffect(() => {
    if (gameData) {
      if (gameData.status === ROOM_STATUS.CLOSED) {
        setGameStatus(GAME_STATUS.FINISHED);
      } else if (gameData.status === ROOM_STATUS.TWO_PLAYERS) {
        // Check current game step
        const playerId =
          gameData.Address_1 === account
            ? 1
            : gameData.Address_2 === account
            ? 2
            : 0;
        if (!playerId) {
          alert('You are not a player in this room!');
          dispatch({
            type: ACTIONS.SET_PAGE,
            payload: { page: PAGES.HOME },
          });
          return;
        }
        const playerHashcode = Web3.utils.hexToString(
          Web3.utils.bytesToHex(gameData['hashcode_' + playerId])
        );
        console.log('player hashcode', playerId, playerHashcode !== '');
        if (playerHashcode !== '') {
          if (!gameData['check_' + playerId]) {
            setRoundStatus(ROUND_STATUS_LIST.SEND_KEY);
          }
        }
      }
    }
  }, [gameData]);

  return (
    <>
      {loaded && (
        <>
          <Header roundStatus={roundStatus} roomId={roomId} />

          <Option
            roundStatus={roundStatus}
            secretKey={secretKey}
            setSecretKey={setSecretKey}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <Status
            roomId={roomId}
            roundStatus={roundStatus}
            setRoundStatus={setRoundStatus}
            selectedOption={selectedOption}
            secretKey={secretKey}
            gameData={gameData}
            setGameStatus={setGameStatus}
          />
        </>
      )}
    </>
  );
};

export default Round;
