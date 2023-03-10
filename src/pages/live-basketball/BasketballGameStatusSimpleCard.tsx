import { FC, PropsWithChildren, useMemo } from 'react';
import { LineChart } from '../../components/LineChart';
import { SHOW_CHART_COUNT } from '../../constants/global';
import { BasketballGameScore } from '../../types/basketball-game-score.types';
import { BasketballGame } from '../../types/basketball-game.types';
import { min2Readable, toNumber } from '../../utils/math.utils';

const extractOverUnder = (data: BasketballGame | BasketballGameScore) =>
  toNumber((data.awayOverUnder ?? '').split(' ')?.[0] ?? '');

const extractPace = (data: BasketballGame | BasketballGameScore) =>
  (toNumber(data.awayScore) + toNumber(data.homeScore)) /
  (toNumber(data.playedTime) / 60);

const extractTotalPace = (data: BasketballGame | BasketballGameScore) => {
  const isNBA = data.quarter?.[1] === 'Q';
  const isCG = data.quarter?.[1] === 'H';
  return extractPace(data) * (isNBA ? 48 : isCG ? 40 : 40);
};

const BasketballGameStatusSimpleCard: FC<
  PropsWithChildren<{
    data: BasketballGame;
    onClick?: () => void;
    isDetail?: boolean;
  }>
> = ({ data, onClick = () => null, isDetail = false }) => {
  const time = useMemo(() => {
    return data.playedTime / 60;
  }, [data.playedTime]);

  const overUnder = useMemo(() => extractOverUnder(data), [data]);

  const paces = useMemo(() => {
    return [extractPace(data), extractTotalPace(data)];
  }, [data]);

  const liveProjected = useMemo(() => [overUnder / 40, overUnder], [overUnder]);

  const liveVsPaces = useMemo(
    () => [
      toNumber(paces[0]) - toNumber(liveProjected[0]),
      toNumber(paces[1]) - toNumber(liveProjected[1]) + 5,
    ],
    [liveProjected, paces]
  );

  const chartData = useMemo(
    () =>
      isDetail
        ? data.scores ?? []
        : (data.scores ?? []).slice(-SHOW_CHART_COUNT),
    [data.scores, isDetail]
  );

  return (
    <table
      border={1}
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderColor: 'lightgray',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <thead>
        <tr>
          <th className='bg-yellow' style={{ width: '35%' }}>
            {data.awayTeam}
          </th>
          <th className='bg-yellow' style={{ width: '15%' }}>
            {data.awayScore}
          </th>
          <th className='bg-blue' style={{ width: '15%' }}>
            {data.homeScore}
          </th>
          <th className='bg-blue' style={{ width: '35%' }}>
            {data.homeTeam}
          </th>
        </tr>
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
              <span>{min2Readable(time)}</span>
            </h3>
          </th>
          <th className={liveVsPaces[1] > 0 ? 'bg-green' : 'bg-red'}>
            <h4 style={{ margin: 0 }}>{Math.abs(liveVsPaces[1]).toFixed(1)}</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* charts */}
        <tr className='br-green'>
          <td
            colSpan={4}
            style={{
              height: isDetail ? Math.max(300, window.innerHeight - 300) : 300,
            }}
          >
            <LineChart
              labels={chartData.map((item) =>
                min2Readable(item.playedTime / 60)
              )}
              data={[
                {
                  label: 'Over / Under',
                  data: chartData.map((item) => extractOverUnder(item)),
                },
                {
                  label: 'Pace',
                  data: chartData.map((item) => extractTotalPace(item)),
                },
                {
                  label: 'Start Over / Under',
                  data: chartData.map(() => overUnder),
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
