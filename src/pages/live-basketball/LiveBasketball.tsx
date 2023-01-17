import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import TabsContainer from '../../components/TabsContainer';
import { REFRESH_TIME_INTERVAL } from '../../constants/global';
import { APIResponseCode } from '../../services/apiResponse';
import basketballGameService from '../../services/basketball-game.services';
import { BasketballGame } from '../../types/basketball-game.types';
import BasketballGameSection from './BasketballGameSection';
import { useNavigate } from 'react-router-dom';

const LiveBasketball: FC<PropsWithChildren<{}>> = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Array<BasketballGame>>([]);

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

  const handleGame = (value: BasketballGame) => {
    console.log(value);
    navigate(`/${value.id}`);
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
              <BasketballGameSection
                title='NBA'
                data={nbaGames}
                onClickGame={handleGame}
              />
            ),
          },
          {
            label: 'College',
            node: (
              <BasketballGameSection
                title='College'
                data={cgGames}
                onClickGame={handleGame}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default LiveBasketball;
