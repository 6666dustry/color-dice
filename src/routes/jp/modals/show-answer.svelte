<script lang="ts">
  import type { Quiz } from "../square/quiz.js";
  import { step, wrong } from "../players.js";
  import { createEventDispatcher } from "svelte";
  export let quiz: Quiz;
  export let answer: string;
  export let showAnswer: boolean;
  const dispatch = createEventDispatcher();

  let answerLog: HTMLDialogElement;
  $: if (answerLog && showAnswer) answerLog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions-->
<dialog
  bind:this={answerLog}
  on:click={() => answerLog.close()}
  on:keydown={() => answerLog.close()}
  on:close={() => {
    if (quiz.getColorName()[0] !== answer) {
      wrong();
    }
    dispatch("close");
    showAnswer = false;
    step();
  }}
>
  <div>
    {#if quiz.getColorName()[0] === answer}
      <h1>正解！</h1>
    {:else}
      <h1>不正解！</h1>
    {/if}
    <h2>
      この色は<span style="background:{quiz.getColor()}"
        >{quiz.getColorName()[0]}</span
      >({quiz.getColorName()[1]})です！
    </h2>

    <p>{quiz.getDescription()}</p>
    <p>
      出典:<a
        on:keydown={(e) => e.preventDefault()}
        href={quiz.getReference()}
        target="_blank"
        rel="noopener noreferrer">{quiz.getReference()}</a
      >
    </p>
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
