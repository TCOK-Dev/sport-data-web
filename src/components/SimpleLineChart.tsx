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

  const marginValue = useMemo(() => maxDistance / 50, [maxDistance]);

  const minValue = useMemo(
    () =>
      data.reduce((ret, cur) => {
        const min = Math.min(...cur);
        return ret > min ? min : ret;
      }, 0) - marginValue,
    [data, marginValue]
  );

  const maxValue = useMemo(
    () =>
      data.reduce((ret, cur) => {
        const max = Math.max(...cur);
        return ret < max ? max : ret;
      }, 0) + marginValue,
    [data, marginValue]
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
          {item.map((itemValue, itemValueIndex) => (
            <ChartItem
              key={itemValue}
              color={itemIndex > 0 ? '#EA4335' : '#4A86E8'}
              value={itemValue}
              min={minValue}
              max={maxValue}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const ChartItem: FC<
  PropsWithChildren<{
    value?: number;
    max?: number;
    min?: number;
    color?: string;
  }>
> = ({ value = 0, max = 0, min = 0, color = '#EA4335' }) => {
  const distance = useMemo(() => Math.abs(max - min), [max, min]);
  const width = useMemo(() => Math.abs(value), [value]);
  const left = useMemo(() => Math.min(0, value), [value]);

  return width ? (
    <div
      style={{
        position: 'absolute',
        top: GAP,
        left: `${((left + min) / distance) * 100}%`,
        width: `${(width / distance) * 100}%`,
        height: BAR_HEIGHT,
        backgroundColor: color,
        color: '#fff',
      }}
    >
      <span style={{ padding: GAP }}>{toNumber(value).toFixed(2)}</span>
    </div>
  ) : null;
};

export default SimpleLineChart;
