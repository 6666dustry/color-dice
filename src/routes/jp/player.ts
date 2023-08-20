import type { quizzes } from "./square/quizzes.js";
import { Board } from "./board.js";
export class Player {
  constructor(color: quizzes[0], pos = 0) {
    this.pos = pos;
    this.color = color;
    this.goaled = false;
    this.quit = false;
    this.rank = Infinity;
  }
  pos: number;
  /**
   * string. 
   * @see https://developer.mozilla.org/ja/docs/Web/CSS/color_value
   */
  color: quizzes[0];
  goaled: boolean;
  quit: boolean;
  rank: number;
  step(rank: number) {
    this.pos += Math.floor(Math.random() * 6) + 1;
    if (this.pos >= Board.sortByCount.length) {
      this.goaled = true;
      this.pos = Board.sortByCount.length - 1; this.rank = rank;
    }
  }
  getSquare() {
    return Board.sortByCount[this.pos];
  }
  getQuiz() {
    return this.getSquare().quiz;
  }
  wrong() {
    this.pos = 0;
  }
  reset() {
    this.pos = 0;
    this.goaled = false;
    this.quit = false;
    this.rank = Infinity;
  }
}