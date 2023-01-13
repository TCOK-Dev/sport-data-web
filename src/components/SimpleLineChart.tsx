import { FC, PropsWithChildren, useMemo } from 'react';
import { toNumber } from '../utils/math.utils';

const BAR_HEIGHT = 24;
const GAP = 2;

const SimpleLineChart: FC<
  PropsWithChildren<{ data?: Array<Array<number>> }>
> = ({ data = [] }) => {
  const maxDistance = useMemo(
    () =>
      data.reduce(
        (ret, cur) =>
          ret < Math.abs(cur[0]) + Math.abs(cur[1])
            ? Math.abs(cur[0]) + Math.abs(cur[1])
            : ret,
        0
      ),
    [data]
  );

  const marginValue = useMemo(() => maxDistance / 10, [maxDistance]);

  const distance = useMemo(
    () => maxDistance + marginValue * 2,
    [marginValue, maxDistance]
  );

  return (
    <div style={{ width: '100%' }}>
      {data.map((item, itemIndex) => (
        <div
          key={itemIndex}
          style={{
            height: BAR_HEIGHT + GAP * 2,
            width: '100%',
            marginBottom: GAP,
            marginTop: GAP,
            position: 'relative',
          }}
        >
          {item[0] ? (
            <div
              style={{
                position: 'absolute',
                top: GAP,
                left: `${toNumber(marginValue / distance) * 100}%`,
                width: `${(Math.abs(item[0]) / distance) * 100}%`,
                height: BAR_HEIGHT,
                backgroundColor: '#4A86E8',
                color: '#fff',
              }}
            >
              <span style={{ padding: GAP }}>{item[0]}</span>
            </div>
          ) : null}
          {item[1] ? (
            <div
              style={{
                position: 'absolute',
                top: GAP,
                left: `${(Math.abs(item[0]) / distance) * 100}%`,
                width: `${(Math.abs(item[1]) / distance) * 100}%`,
                height: BAR_HEIGHT,
                backgroundColor: '#EA4335',
                color: '#fff',
              }}
            >
              <span style={{ padding: GAP }}>{item[1]}</span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SimpleLineChart;
