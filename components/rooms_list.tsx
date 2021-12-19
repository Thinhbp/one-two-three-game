import { useEffect, useState } from 'react';
import Rooms from '../components/rooms';

const RoomsList = () => {
  return (
    <>
      <Rooms type={0} header="Danh sách phòng" showCreateNewRoomBtn={true} />
      <Rooms header="Danh sách đã chơi xong" type={1} />
      <Rooms header="Danh sách cược lớn nhất" type={2} />
    </>
  );
};

export default RoomsList;
