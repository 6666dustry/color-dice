<script lang="ts">
  import ShowQuiz from "./show-quiz.svelte";
  import ShowAnswer from "./show-answer.svelte";
  import Goal from "./goal.svelte";
  import type { Quiz } from "../square/quiz.js";
  import type { Player } from "../player.js";
  export let showQuiz: boolean;
  export let player: Player | null;
  let goal: boolean = false;
  let quiz: Quiz;
  let answer: string;
  let showAnswer: boolean = false;
  let skip = false;
  $: {
    player;
    if (player) {
      skip = player.goaled;
      if (skip) {
        if (player.quit) {
          goal = false;
        } else {
          goal = true;
          player.quit = true;
        }
      }
      quiz = player.getQuiz();
    }
  }
</script>

{#if player}
  <ShowQuiz
    on:close={() => (showAnswer = true)}
    bind:value={answer}
    bind:showQuiz
    {quiz}
    {skip}
  />
  <ShowAnswer
    on:close={() => {
      answer = "";
    }}
    {quiz}
    {answer}
    bind:showAnswer
  />
  <Goal bind:goal />
{/if}
