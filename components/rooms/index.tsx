import { useEffect, useRef, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { useContract } from '@hooks/useContract';
import { useContractV2 } from '@hooks/useContractV2';
import Table from './table';

const Rooms = () => {
  const { account } = useEthers();
  const { getOpeningRooms, getPlayerRooms } = useContractV2();

  const [showNewRoomModal, setNewRoomModal] = useState(false);

  const [openingRooms, setOpeningRooms] = useState<any[]>([]);
  const [playedRooms, setPlayedRooms] = useState<any[]>([]);
  const [biggestBetRooms, setBiggestBetRooms] = useState<any[]>([]);

  const loadDataInterval = useRef<any>();
  const loadDataIntervalTime = 5000;

  const loadData = async () => {
    const rooms = await getOpeningRooms();
    rooms.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
    setOpeningRooms(rooms);

    let _bbRooms = [...rooms];
    _bbRooms.sort((a: any, b: any) => (a.Bet_amount < b.Bet_amount ? 1 : -1));
    setBiggestBetRooms(_bbRooms);

    if (account) {
      let _playedRooms = await getPlayerRooms(account);
      _playedRooms.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
      setPlayedRooms(_playedRooms);
    }
  };

  const cleanUpRooms = () => {
    clearInterval(loadDataInterval.current);
    setOpeningRooms([]);
    setPlayedRooms([]);
    setBiggestBetRooms([]);
  };

  useEffect(() => {
    loadData();
    loadDataInterval.current = setInterval(loadData, loadDataIntervalTime);

    return cleanUpRooms;
  }, [account]);

  return (
    <>
      <Table
        header="Opening Rooms"
        roomsData={openingRooms}
        showCreateNewRoomBtn
        showNewRoomModal={showNewRoomModal}
        setNewRoomModal={setNewRoomModal}
      />
      <Table header="My Rooms" roomsData={playedRooms} />
      <Table header="Biggest Bet Rooms" roomsData={biggestBetRooms} />
    </>
  );
};

export default Rooms;
