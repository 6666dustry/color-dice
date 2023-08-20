import { Square } from "./square/square.js";
const counts = [
  0, 1, 2, 3, 4, 5
  , 17, 18, 19, 20, 21, 6
  , 16, 27, 28, 29, 22, 7
  , 15, 26, 25, 24, 23, 8
  , 14, 13, 12, 11, 10, 9
];
/**
 * 
 */
export class Board {
  static sortByPosition: Square[];
  static sortByCount: Square[];
  static readonly row = 5;
  static readonly col = 6;
  static {
    this.sortByPosition = [...Array(30).keys()].map(i => new Square({
      x: i % 6,
      y: Math.floor(i / 6),
      count: counts[i]
    }));
    this.sortByCount = [...this.sortByPosition].sort((a, b) => {
      return a.pos - b.pos;
    });
  }
  static getBoard() {
    const result = [];
    for (let index = 0; index < this.row; index++) {
      result.push(this.sortByPosition.slice(index * this.col, (index + 1) * this.col));
    }
    return result;
  }
  static reset() {
    this.sortByPosition = [...Array(30).keys()].map(i => new Square({
      x: i % 6,
      y: Math.floor(i / 6),
      count: counts[i]
    }));
    this.sortByCount = [...this.sortByPosition].sort((a, b) => {
      return a.pos - b.pos;
    });
  }
}