import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Game from '../components/game';
import Page from '../components/page';

const Room: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  // TODO get room data

  return (
    <Page>
      <Game roomId={id + ''} />
    </Page>
  );
};

export default Room;
