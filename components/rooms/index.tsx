import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { useContract } from '@hooks/useContract';
import { useContractV2 } from '@hooks/useContractV2';
import Table from './table';

const Rooms = () => {
  const { account } = useEthers();
  const { getRoomStatuses, getRoom } = useContractV2();

  const [showNewRoomModal, setNewRoomModal] = useState(false);

  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [playedRooms, setPlayedRooms] = useState<any[]>([]);
  const [biggestBetRooms, setBiggestBetRooms] = useState<any[]>([]);

  const loadData = async () => {
    const roomStatuses = await getRoomStatuses();

    for (let i = 0; i < roomStatuses.length; i++) {
      const status = roomStatuses[i];
      if (status !== '0') {
        const room = await getRoom(i);

        setAvailableRooms((arr: any[]) => {
          if (!arr.find((r: any) => r.Id === room.Id)) {
            return [...arr, room];
          }
          return arr;
        });

        if (account === room.Address_1 || account === room.Address_2) {
          setPlayedRooms((arr: any[]) => {
            if (!arr.find((r: any) => r.Id === room.Id)) {
              return [...arr, room];
            }
            return arr;
          });
        }

        setBiggestBetRooms((arr: any[]) => {
          if (!arr.find((r: any) => r.Id === room.Id)) {
            return [...arr, room];
          }
          return arr;
        });
      }
    }
  };

  const cleanUpRooms = () => {
    setAvailableRooms([]);
    setPlayedRooms([]);
    setBiggestBetRooms([]);
  };

  useEffect(() => {
    loadData();

    return cleanUpRooms;
  }, [account]);

  useEffect(() => {
    if (!showNewRoomModal) {
      loadData();
      return cleanUpRooms;
    }
  }, [showNewRoomModal]);

  return (
    <>
      <Table
        header="Danh sách phòng"
        roomsData={availableRooms}
        showCreateNewRoomBtn
        showNewRoomModal={showNewRoomModal}
        setNewRoomModal={setNewRoomModal}
      />
      <Table header="Danh sách phòng đã chơi" roomsData={playedRooms} />
      <Table header="Danh sách cược lớn nhất" roomsData={biggestBetRooms} />
    </>
  );
};

export default Rooms;
