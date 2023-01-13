import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { APIResponseCode } from '../../services/apiResponse';
import basketballGameService from '../../services/basketball-game.services';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameStatusCard from './BasketballGameStatusCard';

const LiveBasketball: FC<PropsWithChildren<{}>> = () => {
  const [data, setData] = useState<Array<BasketballGame>>([]);

  const loadData = async () => {
    const res = await basketballGameService.gets();

    if (res.code === APIResponseCode.SUCCESS) {
      setData(res.data ?? []);
    }

    setTimeout(loadData, 1000);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {data.map((game, gameIndex) => (
        <BasketballGameStatusCard key={gameIndex} data={game} />
      ))}
    </div>
  );
};

export default LiveBasketball;
