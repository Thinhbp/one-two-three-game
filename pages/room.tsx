import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Game from '../components/game';
import Page from '../components/page';

const Room: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const roomId = parseInt((id + '').replace('#', ''));

  return (
    <Page>
      <Game roomId={roomId} />
    </Page>
  );
};

export default Room;
