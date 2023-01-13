import { Typography } from '@mui/material';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import TabsContainer from '../../components/TabsContainer';
import { REFRESH_TIME_INTERVAL } from '../../constants/global';
import { APIResponseCode } from '../../services/apiResponse';
import basketballGameService from '../../services/basketball-game.services';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameList from './BasketballGameList';

const LiveBasketball: FC<PropsWithChildren<{}>> = () => {
  const [data, setData] = useState<Array<BasketballGame>>([]);

  const top3Games: Array<BasketballGame> = useMemo(() => {
    return data.slice(0, 3);
  }, [data]);

  const nbaGames: Array<BasketballGame> = useMemo(() => {
    return data.filter((game) => game.quarter?.[1] === 'Q');
  }, [data]);

  const cgGames: Array<BasketballGame> = useMemo(() => {
    return data.filter((game) => game.quarter?.[1] === 'H');
  }, [data]);

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
    <div>
      <Typography variant='h4'>Top 3</Typography>
      <BasketballGameList data={top3Games} />

      <TabsContainer
        data={[
          {
            label: 'NBA',
            node: <BasketballGameList data={nbaGames} />,
          },
          {
            label: 'College',
            node: <BasketballGameList data={cgGames} />,
          },
        ]}
      />
    </div>
  );
};

export default LiveBasketball;
