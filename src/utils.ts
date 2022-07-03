import { IMonthData, IData2022, IThreeExercicsesState } from "./atoms";
import { MONTHS_LIST, REVERSED_MONTHS_LIST } from "./constants";

export const changeMonthToInt = (month: string): string => {
  return (MONTHS_LIST.indexOf(month) + 1).toString();
};

export const makeCategoriesMonth = (currentMonthIdx: number): string[] => {
  if (currentMonthIdx - 7 < 0) {
    return MONTHS_LIST.slice(currentMonthIdx - 7).concat(
      MONTHS_LIST.slice(0, currentMonthIdx + 1)
    );
  } else {
    return MONTHS_LIST.slice(0, currentMonthIdx);
  }
};

export const makeCategoriesDate = (
  data2022: IData2022 | undefined
): string[] => {
  if (typeof data2022 === "undefined") {
    return ["1", "2", "3", "4", "5", "6", "7", "8"];
  } else {
    let availableCategoryNumber = 8;
    let categoriesDate: string[] = [];
    const existingMonthsArray = Object.keys(data2022);

    for (const recentMonth of REVERSED_MONTHS_LIST) {
      if (existingMonthsArray.includes(recentMonth)) {
        const existingDatesArray = Object.keys(data2022[recentMonth]);
        const existingDatesArrayLen = existingDatesArray.length;
        if (existingDatesArrayLen >= availableCategoryNumber) {
          categoriesDate = existingDatesArray
            .sort()
            .slice(existingDatesArrayLen - availableCategoryNumber)
            .map((date) => changeMonthToInt(recentMonth) + "/" + date)
            .concat(categoriesDate);
          availableCategoryNumber = 0;
        } else {
          categoriesDate = existingDatesArray
            .sort()
            .map((date) => changeMonthToInt(recentMonth) + "/" + date)
            .concat(categoriesDate);

          availableCategoryNumber -= existingDatesArrayLen;
        }

        if (availableCategoryNumber == 0) {
          return categoriesDate;
        }
      }
    }
    return categoriesDate;
  }
};

export const returnLatestDateOfMonthData = (monthData: IMonthData) => {
  const existingDatesArray = Object.keys(monthData).sort();
  const existingDatesArrayLen = existingDatesArray.length;
  return existingDatesArray[existingDatesArrayLen - 1];
};

export const calculateWeightSumOfTheDay = (dateData: IThreeExercicsesState) => {
  return (
    parseInt(dateData.benchPress) +
    parseInt(dateData.squat) +
    parseInt(dateData.deadlift)
  );
};

export const returnDataDependOnBtnType = (
  recentDateData: IThreeExercicsesState,
  btnType: string
) => {
  if (btnType === "total") {
    return calculateWeightSumOfTheDay(recentDateData);
  } else if (btnType === "benchPress") {
    return parseInt(recentDateData.benchPress);
  } else if (btnType === "squat") {
    return parseInt(recentDateData.squat);
  } else {
    return parseInt(recentDateData.deadlift);
  }
};
