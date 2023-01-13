import React, { FC, PropsWithChildren, useMemo } from 'react';
import SimpleLineChart from '../../components/SimpleLineChart';
import { BasketballGame } from '../../types/basketball-game.types';
import { toNumber } from '../../utils/math.utils';

const BasketballGameStatusCard: FC<
  PropsWithChildren<{ data: BasketballGame }>
> = ({ data }) => {
  const overUnder = useMemo(
    () => (data.awayOverUnder ?? '').split(' ')?.[0] ?? '',
    [data.awayOverUnder]
  );

  const paces = [2.8, 110.0];
  const liveProjected = [3.3, 133.0];
  const liveVsPaces = [
    toNumber(paces[0]) - toNumber(liveProjected[0]),
    toNumber(paces[1]) - toNumber(liveProjected[1]),
  ];

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
          <td>{overUnder}</td>
          <td></td>
        </tr>
        <tr className='bg-yellow'>
          <td>Time</td>
          <td>{data.clock}</td>
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
          <td className='bg-gray'>
            {Math.abs(toNumber(data.awayScore) - toNumber(data.homeScore))}
          </td>
          <td className='bg-gray'>40</td>
        </tr>

        {/* Pace, Live Projected */}
        <tr>
          <td>Pace</td>
          <td>{paces[0]}</td>
          <td>{paces[1]}</td>
        </tr>
        <tr>
          <td>Live Projected</td>
          <td>{liveProjected[0]}</td>
          <td>{liveProjected[1]}</td>
        </tr>

        {/* total */}
        <tr>
          <td className='bg-green'>Live vs Pace</td>
          <td className={liveVsPaces[0] > 0 ? 'bg-green' : 'bg-red'}>
            {liveVsPaces[0]}
          </td>
          <td className={liveVsPaces[1] > 0 ? 'bg-green' : 'bg-red'}>
            {liveVsPaces[1]}
          </td>
        </tr>

        {/* charts */}
        <tr className='br-green'>
          <td colSpan={3}>
            <SimpleLineChart
              data={[
                [-18, 110],
                [0, 130],
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BasketballGameStatusCard;
