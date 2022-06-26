import { atom } from "recoil";

interface IThreeExercicsesState {
  benchPress: number;
  squat: number;
  deadlift: number;
}
// export const threeExercisesState = atom<IThreeExercicsesState>({
//   key: "threeExercisesState",
//   default: {
//     benchPress: 0,
//     squat: 0,
//     deadlift: 0,
//   },
// });

// interface I2022Data {
//   Jan: {
//     :
//   }
// }

export interface IData2022 {
  [key: string]: {
    [key: string]: {
      benchPress: string;
      squat: string;
      deadlift: string;
    };
  };
}

export const data2022State = atom<IData2022>({
  key: "2022Data",
  default: {},
});
