import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC, PropsWithChildren } from 'react';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameStatusSimpleCard from './BasketballGameStatusSimpleCard';

const BasketballGameList: FC<
  PropsWithChildren<{
    data?: Array<BasketballGame>;
    onClick?: (p: BasketballGame) => void;
  }>
> = ({ data = [], onClick = () => null }) => {
  return data.length ? (
    <Grid container spacing={2}>
      {data.map((game, gameIndex) => (
        <Grid item key={gameIndex} lg={4} md={4} sm={6} xs={12}>
          <BasketballGameStatusSimpleCard
            data={game}
            onClick={() => onClick(game)}
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant='h6' align='center' color='GrayText' fontWeight={500}>
      There is no games
    </Typography>
  );
};

export default BasketballGameList;
