import { Typography } from '@mui/material';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import TabsContainer from '../../components/TabsContainer';
import { REFRESH_TIME_INTERVAL } from '../../constants/global';
import { APIResponseCode } from '../../services/apiResponse';
import basketballGameService from '../../services/basketball-game.services';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameList from './BasketballGameList';

const TOP_3_TIME_LIMIT = 300;

const LiveBasketball: FC<PropsWithChildren<{}>> = () => {
  const [data, setData] = useState<Array<BasketballGame>>([]);

  const nbaGames: Array<BasketballGame> = useMemo(() => {
    return data.filter((game) => game.quarter?.[1] === 'Q');
  }, [data]);

  const nbaTop3Games: Array<BasketballGame> = useMemo(() => {
    return nbaGames
      .filter((item) => item.playedTime > TOP_3_TIME_LIMIT)
      .sort((a, b) =>
        Math.abs(a.awayScore - a.homeScore) >
        Math.abs(b.awayScore - b.homeScore)
          ? -1
          : 1
      )
      .slice(0, 3);
  }, [nbaGames]);

  const cgGames: Array<BasketballGame> = useMemo(() => {
    return data.filter((game) => game.quarter?.[1] === 'H');
  }, [data]);

  const cgTop3Games: Array<BasketballGame> = useMemo(() => {
    return cgGames
      .filter((item) => item.playedTime > TOP_3_TIME_LIMIT)
      .sort((a, b) =>
        Math.abs(a.awayScore - a.homeScore) >
        Math.abs(b.awayScore - b.homeScore)
          ? -1
          : 1
      )
      .slice(0, 3);
  }, [cgGames]);

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
      <TabsContainer
        data={[
          {
            label: 'NBA',
            node: (
              <div>
                <Typography variant='h4' color='primary' fontWeight={800}>
                  Top 3
                </Typography>
                <BasketballGameList data={nbaTop3Games} />
                <br />

                <Typography variant='h4' color='primary' fontWeight={800}>
                  NBA
                </Typography>
                <BasketballGameList data={nbaGames} />
              </div>
            ),
          },
          {
            label: 'College',
            node: (
              <div>
                <Typography variant='h4' color='primary' fontWeight={800}>
                  Top 3
                </Typography>
                <BasketballGameList data={cgTop3Games} />
                <br />

                <Typography variant='h4' color='primary' fontWeight={800}>
                  College
                </Typography>
                <BasketballGameList data={cgGames} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default LiveBasketball;
