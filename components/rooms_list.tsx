import { useEffect, useState } from 'react';
import Rooms from '../components/rooms';
import { useContract } from '../hooks/useContract';
import { useContractV2 } from '../hooks/useContractV2';
import { useEthers } from '@usedapp/core';

interface RoomsListProps {
  setPage: any;
}

const RoomsList = ({ setPage }: RoomsListProps) => {
  const { useGetRooms, getRoom } = useContract();
  const { getRoom: getRoomV2 } = useContractV2();

  const rooms = useGetRooms();

  const { account } = useEthers();

  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [playedRooms, setPlayedRooms] = useState<any[]>([]);
  const [biggestBetRooms, setBiggestBetRooms] = useState<any[]>([]);

  rooms.forEach(async (status: any, index: number) => {
    if (status) {
      if (allRooms[index]) return;
      const room = await getRoomV2(index);
      if (!room) return;

      setAllRooms((arr: any[]) => {
        arr[index] = room;
        return arr;
      });

      setAvailableRooms((arr: any[]) => {
        if (arr.findIndex((v: any) => v.Id === room.Id) === -1) {
          arr.push(room);
        }
        return arr;
      });

      if (room.Address_1 === account || room.Address_2 === account) {
        setPlayedRooms((arr: any[]) => {
          if (arr.findIndex((v: any) => v.Id === room.Id) === -1) {
            arr.push(room);
          }
          return arr;
        });
      }
    }
  });

  return (
    <>
      <Rooms
        setPage={setPage}
        header="Danh sách phòng"
        roomsData={availableRooms}
        showCreateNewRoomBtn={true}
      />
      <Rooms
        header="Danh sách đã chơi xong"
        setPage={setPage}
        roomsData={playedRooms}
      />
      <Rooms
        header="Danh sách cược lớn nhất"
        setPage={setPage}
        roomsData={biggestBetRooms}
      />
    </>
  );
};

export default RoomsList;
