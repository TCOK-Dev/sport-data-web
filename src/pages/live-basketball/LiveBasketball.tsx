import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { REFRESH_TIME_INTERVAL } from '../../constants/global';
import { APIResponseCode } from '../../services/apiResponse';
import basketballGameService from '../../services/basketball-game.services';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameStatusSimpleCard from './BasketballGameStatusSimpleCard';

const LiveBasketball: FC<PropsWithChildren<{}>> = () => {
  const [data, setData] = useState<Array<BasketballGame>>([]);

  const loadData = async () => {
    const res = await basketballGameService.getsLive();

    if (res.code === APIResponseCode.SUCCESS) {
      setData(res.data ?? []);
    }

    setTimeout(loadData, REFRESH_TIME_INTERVAL);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        flexWrap: 'wrap',
      }}
    >
      {data.map((game, gameIndex) => (
        <div key={gameIndex} style={{ width: 350 }}>
          <BasketballGameStatusSimpleCard data={game} />
        </div>
      ))}
    </div>
  );
};

export default LiveBasketball;
