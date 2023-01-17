import { Close } from '@mui/icons-material';
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { REFRESH_TIME_INTERVAL } from '../../constants/global';
import { APIResponseCode } from '../../services/apiResponse';
import basketballGameService from '../../services/basketball-game.services';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameStatusSimpleCard from './BasketballGameStatusSimpleCard';
import { useNavigate } from 'react-router-dom';

const LiveBasketballDetail: FC<PropsWithChildren<{}>> = () => {
  const navigate = useNavigate();

  const { basketballId = '' } = useParams();

  const [data, setData] = useState<BasketballGame>();

  const loadData = async () => {
    const res = await basketballGameService.get({ id: basketballId });

    if (res.code === APIResponseCode.SUCCESS) {
      setData(res.data);
    }
  };

  const handleClose = () => {
    navigate(-1);
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
        <div>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h5' color='primary' fontWeight={500}>
                {data.title}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose} color='error'>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <BasketballGameStatusSimpleCard data={data} isDetail={true} />
        </div>
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
