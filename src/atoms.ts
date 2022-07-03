import { atom } from "recoil";

export interface IThreeExercicsesState {
  benchPress: string;
  squat: string;
  deadlift: string;
}

export interface IMonthData {
  [key: string]: IThreeExercicsesState;
}
export interface IData2022 {
  [key: string]: IMonthData;
}

export const data2022State = atom<IData2022>({
  key: "2022Data",
  default: {},
});

export const recentExericiseDataState = atom<IThreeExercicsesState>({
  key: "recentThreeExerciseData",
  default: {
    benchPress: "0",
    squat: "0",
    deadlift: "0",
  },
});
