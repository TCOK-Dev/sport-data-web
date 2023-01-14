import { FC, PropsWithChildren, useMemo } from 'react';
import { LineChart } from '../../components/LineChart';
import SimpleLineChart from '../../components/SimpleLineChart';
import { BasketballGame } from '../../types/basketball-game.types';
import { secs2Mins, toNumber } from '../../utils/math.utils';

const BasketballGameStatusSimpleCard: FC<
  PropsWithChildren<{ data: BasketballGame }>
> = ({ data }) => {
  const time = useMemo(() => {
    return data.playedTime / 60;
  }, [data.playedTime]);

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
          <th className={overUnder > 0 ? 'bg-green' : 'bg-red'}>
            <h4 style={{ margin: 0 }}>{Math.abs(overUnder).toFixed(1)}</h4>
          </th>
          <th colSpan={2}>
            <h3
              style={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 15,
              }}
            >
              {data.quarter ? <b>({data.quarter ?? ''})</b> : null}
              <span>{secs2Mins(time)}</span>
            </h3>
          </th>
          <th className={liveVsPaces[1] > 0 ? 'bg-green' : 'bg-red'}>
            <h4 style={{ margin: 0 }}>{Math.abs(liveVsPaces[1]).toFixed(1)}</h4>
          </th>
        </tr>
        <tr>
          <th className='bg-yellow' style={{ width: '35%' }}>
            {data.awayTeam}
          </th>
          <th className='bg-yellow' style={{ width: '15%' }}>
            {data.awayScore}
          </th>
          <th className='bg-green' style={{ width: '15%' }}>
            {data.homeScore}
          </th>
          <th className='bg-green' style={{ width: '35%' }}>
            {data.homeTeam}
          </th>
        </tr>
      </thead>
      <tbody>
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
        <tr className='br-green'>
          <td colSpan={4}>
            <LineChart
              labels={(data.scores ?? []).map((item) => item.playedTime)}
              data={[
                {
                  label: 'Away Score',
                  data: (data.scores ?? []).map((item) => item.awayScore),
                },
                {
                  label: 'Home Score',
                  data: (data.scores ?? []).map((item) => item.homeScore),
                },
                {
                  label: 'Starting Over/Under',
                  data: (data.scores ?? []).map((item) => overUnder),
                },
                {
                  label: 'Pace',
                  data: (data.scores ?? []).map((item) => paces[1]),
                },
              ]}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BasketballGameStatusSimpleCard;
