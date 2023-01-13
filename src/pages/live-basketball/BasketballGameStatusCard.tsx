import React, { FC, PropsWithChildren, useMemo } from 'react';
import SimpleLineChart from '../../components/SimpleLineChart';
import { BasketballGame } from '../../types/basketball-game.types';
import { toNumber } from '../../utils/math.utils';

const BasketballGameStatusCard: FC<
  PropsWithChildren<{ data: BasketballGame }>
> = ({ data }) => {
  const time = useMemo(
    () => Number(20 - (toNumber(data.clock) % 120) / 60),
    [data.clock]
  );

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
          <th colSpan={3}>
            {data.title ?? ''} ( {data.awayTeam} vs {data.homeTeam} )
          </th>
        </tr>
      </thead>
      <tbody>
        {/* yellow section */}
        <tr className='bg-yellow'>
          <td>Over / Under Live</td>
          <td>{overUnder.toFixed(2)}</td>
          <td></td>
        </tr>
        <tr className='bg-yellow'>
          <td>Time</td>
          <td>{time.toFixed(2)}</td>
          <td></td>
        </tr>
        <tr className='bg-yellow'>
          <td>Away Team Score</td>
          <td>{data.awayScore ?? ''}</td>
          <td></td>
        </tr>
        <tr className='bg-yellow'>
          <td>Home Team Score</td>
          <td>{data.homeScore ?? ''}</td>
          <td></td>
        </tr>

        {/* total */}
        <tr>
          <td className='bg-green'>Mins</td>
          <td className='bg-gray'>1</td>
          <td className='bg-gray'>40</td>
        </tr>

        {/* Pace, Live Projected */}
        <tr>
          <td>Pace</td>
          <td>{paces[0].toFixed(2)}</td>
          <td>{paces[1].toFixed(2)}</td>
        </tr>
        <tr>
          <td>Live Projected</td>
          <td>{liveProjected[0].toFixed(2)}</td>
          <td>{liveProjected[1].toFixed(2)}</td>
        </tr>

        {/* total */}
        <tr>
          <td className='bg-green'>Live vs Pace</td>
          <td className={liveVsPaces[0] > 0 ? 'bg-green' : 'bg-red'}>
            {liveVsPaces[0].toFixed(2)}
          </td>
          <td className={liveVsPaces[1] > 0 ? 'bg-green' : 'bg-red'}>
            {liveVsPaces[1].toFixed(2)}
          </td>
        </tr>

        {/* charts */}
        <tr className='br-green'>
          <td colSpan={3}>
            <SimpleLineChart
              data={[
                [paces[1], liveProjected[1]],
                [0, overUnder],
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BasketballGameStatusCard;
