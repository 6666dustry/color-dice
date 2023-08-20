import * as q from "./quizzes.js";
export class Quiz {
  constructor() {
    this.data = q.getQuiz();
  }
  data: q.quizzes[0];
  getColor() {
    return this.data[q.hex];
  }
  getDescription() {
    return this.data[q.description];
  }
  getMaskedDescription() {
    const color = this.getColorName();
    let desc = this.getDescription()
      .replaceAll(
        color[0],
        "".padEnd(color[0].length, "X")
      )
      .replaceAll(
        color[1],
        "".padEnd(color[1].length, "x")
      );
    if (color[0].endsWith("色")) {
      desc = desc.replaceAll(color[0].slice(0, -1), "".padStart(color[0].length - 1, "X"));
    }
    return desc;
  }
  getColorName(): [Kanzi: string, Hiragana: string] {
    const separate = this.data[q.name].split("（");
    return [separate[0], separate[1].slice(0, -1)];
  }
  getReference() {
    return this.data[q.reference];
  }
}