import { Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameStatusSimpleCard from './BasketballGameStatusSimpleCard';

const BasketballGameList: FC<
  PropsWithChildren<{ data?: Array<BasketballGame> }>
> = ({ data = [] }) => {
  return (
    <Grid container spacing={2}>
      {data.map((game, gameIndex) => (
        <Grid item key={gameIndex} lg={3} md={4} sm={6} xs={12}>
          <BasketballGameStatusSimpleCard data={game} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BasketballGameList;
