export const addZero = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};
