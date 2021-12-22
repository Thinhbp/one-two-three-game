import type { NextPage } from 'next';
import { DAppProvider } from '@usedapp/core';
import { createContext, useReducer } from 'react';
import { Header } from '@components/common';
import homeStyles from '@styles/Home.module.css';
import reducer, { initState, PAGES } from './reducer';
import Rooms from '@components/rooms';
import Game from '@components/game';

export const PageContext = createContext({});

const Page: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <DAppProvider
      config={{
        notifications: {
          expirationPeriod: 2000,
          checkInterval: 500,
        },
      }}
    >
      <PageContext.Provider value={[state, dispatch]}>
        <Header />
        <div className={homeStyles.container}>
          {state.page === PAGES.HOME && <Rooms />}
          {state.page === PAGES.ROOM && <Game roomId={state.id} />}
        </div>
      </PageContext.Provider>
    </DAppProvider>
  );
};

export * from './hooks';
export * from './reducer';
export default Page;
