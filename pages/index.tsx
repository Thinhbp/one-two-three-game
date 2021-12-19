import type { NextPage } from 'next';
import RoomsList from '../components/rooms_list';
import Game from '../components/game';
import { useState } from 'react';
import Header from '../components/header';
import { DAppProvider } from '@usedapp/core';
import homeStyles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [page, setPage] = useState({ id: 0 });

  return (
    <DAppProvider
      config={{
        notifications: {
          expirationPeriod: 2000,
          checkInterval: 500,
        },
      }}
    >
      <Header setPage={setPage} />
      <div className={homeStyles.container}>
        {page.id === 0 && <RoomsList setPage={setPage} />}
        {page.id === 1 && <Game page={page} setPage={setPage} />}
      </div>
    </DAppProvider>
  );
};

export default Home;
