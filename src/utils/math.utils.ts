export const toNumber = (str: any) => {
  const n = Number(str);
  return n ? n : 0;
};

export const secs2Mins = (str: any) => {
  const seconds = toNumber(str);
  return `${Math.floor(seconds).toFixed(0)} : ${(
    (seconds - Math.floor(seconds)) *
    60
  ).toFixed(0)}`;
};
