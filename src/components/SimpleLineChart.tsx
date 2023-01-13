import { FC, PropsWithChildren, useMemo } from 'react';
import { toNumber } from '../utils/math.utils';

// const BAR_HEIGHT = 16;
const GAP = 2;

const SimpleLineChart: FC<
  PropsWithChildren<{ data?: Array<Array<number>> }>
> = ({ data = [] }) => {
  const minRawValue = useMemo(
    () => data.reduce((ret, cur) => (ret > cur[0] ? cur[0] : ret), 0),
    [data]
  );
  const maxRawValue = useMemo(
    () => data.reduce((ret, cur) => (ret < cur[1] ? cur[1] : ret), 0),
    [data]
  );

  const distanceRaw = useMemo(
    () => Math.abs(maxRawValue - minRawValue),
    [maxRawValue, minRawValue]
  );

  const marginValue = useMemo(() => distanceRaw / 10, [distanceRaw]);

  const distance = useMemo(() => (distanceRaw * 6) / 5, [distanceRaw]);

  const minValue = useMemo(
    () => minRawValue - marginValue,
    [marginValue, minRawValue]
  );

  //   const maxValue = useMemo(
  //     () => maxRawValue + marginValue,
  //     [marginValue, maxRawValue]
  //   );

  return (
    <div style={{ width: '100%' }}>
      {data.map((item, itemIndex) => (
        <div
          key={itemIndex}
          style={{
            // height: BAR_HEIGHT + GAP * 2,
            width: '100%',
            marginBottom: GAP,
            marginTop: GAP,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: GAP,
              left: `${toNumber(marginValue / distance) * 100}%`,
              width: `${(Math.abs(Math.min(item[0], 0)) / distance) * 100}%`,
              //   height: BAR_HEIGHT,
              backgroundColor: '#EA4335',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              padding: GAP,
            }}
          >
            <span>{item[0]}</span>
          </div>
          <div
            style={{
              position: 'absolute',
              top: GAP,
              left: `${Math.abs(toNumber(minValue / distance)) * 100}%`,
              width: `${(Math.abs(Math.max(item[1], 0)) / distance) * 100}%`,
              //   height: BAR_HEIGHT,
              backgroundColor: '#4A86E8',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              padding: GAP,
            }}
          >
            <span>0</span>
            <span>{item[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleLineChart;
