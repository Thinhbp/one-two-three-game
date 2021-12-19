import { useEffect, useState } from 'react';
import Rooms from '../components/rooms';
import { useContract } from '../hooks/useContract';
import { useContractV2 } from '../hooks/useContractV2';

const RoomsList = () => {
  const { useGetRooms, getRoom } = useContract();
  const { getRoom: getRoomV2 } = useContractV2();

  const rooms = useGetRooms();

  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [playedRooms, setPlayedRooms] = useState<any[]>([]);
  const [biggestBetRooms, setBiggestBetRooms] = useState<any[]>([]);

  rooms.forEach(async (status: any, index: number) => {
    if (status) {
      const room = await getRoomV2(index);
      setAvailableRooms((arr: any[]) => {
        if (arr.findIndex((v: any) => v.Id === room.Id) === -1) {
          arr.push(room);
        }
        return arr;
      });
    }
  });

  return (
    <>
      <Rooms
        header="Danh sách phòng"
        roomsData={availableRooms}
        showCreateNewRoomBtn={true}
      />
      <Rooms header="Danh sách đã chơi xong" roomsData={playedRooms} />
      <Rooms header="Danh sách cược lớn nhất" roomsData={biggestBetRooms} />
    </>
  );
};

export default RoomsList;
