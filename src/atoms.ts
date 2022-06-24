import { atom } from "recoil";

interface IThreeExercicsesState {
  benchPress: number;
  squat: number;
  deadlift: number;
}
export const threeExercisesState = atom<IThreeExercicsesState>({
  key: "threeExercisesState",
  default: {
    benchPress: 0,
    squat: 0,
    deadlift: 0,
  },
});
