import React, { FC, PropsWithChildren, useMemo } from 'react';
import SimpleLineChart from '../../components/SimpleLineChart';
import { BasketballGame } from '../../types/basketball-game.types';
import { toNumber } from '../../utils/math.utils';

const BasketballGameStatusSimpleCard: FC<
  PropsWithChildren<{ data: BasketballGame }>
> = ({ data }) => {
  const isNBA = useMemo(() => data.quarter?.[1] === 'Q', [data.quarter]);
  const isCG = useMemo(() => data.quarter?.[1] === 'H', [data.quarter]);

  const time = useMemo(() => {
    const playedSeconds = isNBA
      ? // quarter 12min * 4
        (toNumber(data.quarter?.[0]) - 1) * 720 + (720 - toNumber(data.clock))
      : isCG
      ? // half 20min * 2
        (toNumber(data.quarter?.[0]) - 1) * 1200 + (1200 - toNumber(data.clock))
      : 0;
    return playedSeconds / 60;
  }, [data.clock, data.quarter, isCG, isNBA]);

  const overUnder = useMemo(
    () => toNumber((data.awayOverUnder ?? '').split(' ')?.[0] ?? ''),
    [data.awayOverUnder]
  );

  const paces = useMemo(() => {
    const pace = (toNumber(data.awayScore) + toNumber(data.homeScore)) / time;
    return [pace, pace * 40];
  }, [data.awayScore, data.homeScore, time]);

  const liveProjected = useMemo(() => [overUnder / 40, overUnder], [overUnder]);

  const liveVsPaces = useMemo(
    () => [
      toNumber(paces[0]) - toNumber(liveProjected[0]),
      toNumber(paces[1]) - toNumber(liveProjected[1]) + 5,
    ],
    [liveProjected, paces]
  );

  return (
    <table
      border={1}
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderColor: 'lightgray',
      }}
    >
      <thead>
        <tr>
          <th></th>
          <th colSpan={2}>
            <h3 style={{ margin: 0 }}>
              <b>{data.quarter ?? ''}</b>
              <span>
                {Math.floor(time).toFixed(0)}:
                {((time - Math.floor(time)) * 60).toFixed(0)}
              </span>
            </h3>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* yellow section */}
        <tr>
          <td className='bg-yellow' width={'35%'}>
            {data.awayTeam}
          </td>
          <td className='bg-yellow' width={'15%'}>
            {data.awayScore}
          </td>
          <td className='bg-green' width={'15%'}>
            {data.homeScore}
          </td>
          <td className='bg-green' width={'35%'}>
            {data.homeTeam}
          </td>
        </tr>

        {/* charts */}
        <tr className='br-green'>
          <td colSpan={4}>
            <SimpleLineChart
              data={[
                [paces[1], liveVsPaces[1]],
                [overUnder, 0],
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BasketballGameStatusSimpleCard;
