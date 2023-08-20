import { reset as pReset, getAllUsed } from "../players.js";
import { Board } from "../board.js";
import { reset as qReset } from "../square/quizzes.js";
export function reset() {
  qReset(getAllUsed());
  pReset();
  Board.reset();
}