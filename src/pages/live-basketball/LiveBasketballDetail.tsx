import { CircularProgress, Grid, Typography, Stack } from '@mui/material';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { REFRESH_TIME_INTERVAL } from '../../constants/global';
import { APIResponseCode } from '../../services/apiResponse';
import basketballGameService from '../../services/basketball-game.services';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameStatusSimpleCard from './BasketballGameStatusSimpleCard';

const LiveBasketballDetail: FC<PropsWithChildren<{}>> = () => {
  const { basketballId = '' } = useParams();

  const [data, setData] = useState<BasketballGame>();

  const loadData = async () => {
    const res = await basketballGameService.get({ id: basketballId });

    if (res.code === APIResponseCode.SUCCESS) {
      setData(res.data);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, REFRESH_TIME_INTERVAL);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {data ? (
        <Stack spacing={2}>
          <Typography variant='h5' color='primary' fontWeight={500}>
            {data.title}
          </Typography>
          <BasketballGameStatusSimpleCard data={data} isDetail={true} />
        </Stack>
      ) : (
        <Grid container spacing={1} alignItems='center'>
          <Grid item>
            <CircularProgress />
          </Grid>
          <Grid item>
            <Typography color='primary'>Loading ...</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default LiveBasketballDetail;
