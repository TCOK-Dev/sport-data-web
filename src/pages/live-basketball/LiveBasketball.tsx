import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { APIResponseCode } from '../../services/apiResponse';
import basketballService from '../../services/basketball.services';
import { Basketball } from '../../types/basketball.types';

const LiveBasketball: FC<PropsWithChildren<{}>> = () => {
  const [data, setData] = useState<Basketball>();

  const loadData = async () => {
    const res = await basketballService.get({ id: '1' });

    if (res.code === APIResponseCode.SUCCESS) {
      setData(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return <div>{data?.title ?? ''}</div>;
};

export default LiveBasketball;
