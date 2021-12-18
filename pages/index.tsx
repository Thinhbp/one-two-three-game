import type { NextPage } from 'next';
import Rooms from '../components/rooms';
import Page from '../components/page';

const Home: NextPage = () => {
  const rooms = [
    {
      id: 0,
      room: 123,
      coin: 'ETH',
      amount: '0.001',
      rounds: 3,
    },
  ];

  return (
    <Page>
      <Rooms
        header="Danh sách phòng"
        roomsData={rooms}
        showCreateNewRoomBtn={true}
      />
      <Rooms header="Danh sách đã chơi xong" roomsData={rooms} />
      <Rooms header="Danh sách cược lớn nhất" roomsData={rooms} />
    </Page>
  );
};

export default Home;
