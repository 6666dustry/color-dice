import { writable } from "svelte/store";
export const mode = writable<"easy" | "normal" | "hard" | "unbelievable">("normal");
export const debug = !true;