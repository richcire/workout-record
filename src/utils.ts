import { MONTHS_LIST } from "./constants";

export const changeMonthToInt = (month: string): string => {
  return (MONTHS_LIST.indexOf(month) + 1).toString();
};
