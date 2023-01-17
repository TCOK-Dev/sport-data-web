import { Typography } from '@mui/material';
import { FC, PropsWithChildren, useMemo } from 'react';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameList from './BasketballGameList';

const TOP_3_TIME_LIMIT = 300;

const BasketballGameSection: FC<
  PropsWithChildren<{
    data?: Array<BasketballGame>;
    title?: string;
    onClickGame?: (p: BasketballGame) => void;
  }>
> = ({ data = [], title = 'Games', onClickGame = () => null }) => {
  const top3Games: Array<BasketballGame> = useMemo(() => {
    return data
      .filter((item) => item.playedTime > TOP_3_TIME_LIMIT)
      .sort((a, b) =>
        Math.abs(a.awayScore - a.homeScore) >
        Math.abs(b.awayScore - b.homeScore)
          ? -1
          : 1
      )
      .slice(0, 3);
  }, [data]);

  return (
    <div>
      <Typography variant='h5' color='primary' fontWeight={500}>
        Top 3
      </Typography>
      <BasketballGameList data={data} onClick={onClickGame} />
      <br />

      <Typography variant='h5' color='primary' fontWeight={500}>
        {title}
      </Typography>
      <BasketballGameList data={top3Games} onClick={onClickGame} />
    </div>
  );
};

export default BasketballGameSection;
