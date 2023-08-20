import { writable, get } from "svelte/store";
import { Player } from "./player.js";
import { getQuiz } from "./square/quizzes.js";
export const players = writable([new Player(
  getQuiz()
)]);

let index = 0;
export function getTurn() {
  return index;
}
function getRank() {
  return get(players).filter(p => p.goaled).length;
}

export function step() {
  index += 1;
  if (index >= get(players).length) {
    index = 0;
  }
  return index;
}
export function getPlayer(i = index) {
  return get(players)[i];
}
export function getAvailablePlayer() {
  const players_ = get(players);
  let count = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!players_[index].quit) {
      return players_[index];
    }
    if (count > players_.length) {
      break;
    }
    step();
    count++;
  }
  return null;
}
function isEnd() {
  return !get(players).some(p => !p.goaled);
}
/**
 * 
 * @returns 現在のプレイヤーのターン。-1ならゲーム終了を表す
 */
export function dice() {
  players.update((p) => {
    getPlayer().step(getRank());
    return p;
  });
  if (isEnd()) {
    return -1;
  }
  return index;
}
export function wrong() {
  players.update((p) => {
    p[index]?.wrong();
    return p;
  });
}
export function reset() {
  get(players).forEach(p => p.reset());
  index = 0;
}
export function getAllUsed() {
  return get(players).map(p => p.color);
}