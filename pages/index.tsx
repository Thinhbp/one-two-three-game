import type { NextPage } from 'next';
import RoomsList from '../components/rooms_list';
import Page from '../components/page';

const Home: NextPage = () => {
  return (
    <Page>
      <RoomsList />
    </Page>
  );
};

export default Home;
