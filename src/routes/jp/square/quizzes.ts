import colors from "../../../assets/color_list.csv?raw";
import Papa from "papaparse";
export type quizzes = Readonly<[name: string, rgb: string, cymk: string, hex: string, description: string, reference: string][]>;
export const rawQuizzes: quizzes = Papa.parse(colors).data as quizzes;
export const name = 0, rgba = 1, cmyk = 2, hex = 3, description = 4, reference = 5;
const usedId: number[] = [];
export function getQuiz() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const id = Math.floor(Math.random() * rawQuizzes.length);
    if (usedId.indexOf(id) === -1) {
      usedId.push(id);
      if (usedId.length >= rawQuizzes.length) usedId.length = 0;
      return rawQuizzes[id];
    }
  }
}
export function reset(registration: quizzes[0][]) {
  usedId.length = 0;
  registration.forEach((p) => {
    usedId.push(rawQuizzes.indexOf(p));
  });
}