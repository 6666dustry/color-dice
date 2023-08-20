import type { Player } from "../player.js";
import { Quiz } from "./quiz.js";
import { hex } from "./quizzes.js";

export interface Position {
  x: number;
  y: number;
  count: number;
}
export class Square {
  constructor(position: Position) {
    this.x = position.x;
    this.y = position.y;
    this.pos = position.count;
    this.quiz = new Quiz();
  }
  readonly x: number;
  readonly y: number;
  readonly pos: number;
  quiz: Quiz;
  render(players: Player[]) {
    const here = players.filter((player) => {
      return player.pos === this.pos;
    });
    let result = `background:${ this.quiz.getColor() };`;
    if (here.length > 0) {
      if (here.length === 1) {
        result += `border:1em solid ${ here[0].color[hex] };`;
      } else {
        result += `border:1em solid white;
        border-image: linear-gradient(to right,${ here.reduce((pre, current, i) => `${ pre } ${ current.color[hex] } ${ 100 / here.length * i }% ${ 100 / here.length * (i + 1) }%,`, "").slice(0, -1) }) 30;`;
      }
    }
    return result;
  }
}