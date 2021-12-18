import type { NextPage } from 'next';
import Header from '../components/header';
import homeStyles from '../styles/Home.module.css';
import { DAppProvider } from '@usedapp/core';

const Page: NextPage = (props) => {
  return (
    <DAppProvider
      config={{
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000,
        },
      }}
    >
      <Header />
      <div className={homeStyles.container}>{props.children}</div>
    </DAppProvider>
  );
};

export default Page;
