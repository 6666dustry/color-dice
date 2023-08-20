<script lang="ts">
  import type { Quiz } from "../square/quiz.js";
  import { createEventDispatcher } from "svelte";
  import { step } from "../players.js";
  export let quiz: Quiz;
  export let showQuiz: boolean;
  let dialog: HTMLDialogElement;
  export let value: string | undefined = "";
  export let skip: boolean;
  let disabled = true;
  const dispatch = createEventDispatcher();

  function validate(value: string | undefined) {
    if (!value) return false;
    if (value.length !== quiz.getColorName()[0].length) return false;
    if (value.match(/[a-z]/)) return false;
    if (value.match(/[0-9]/)) return false;
    if (value.match(/[あ-ん]/)) return false;
    return true;
  }
  $: if (skip && showQuiz) {
    showQuiz = false;
    step();
  }
  $: if (dialog && showQuiz && !skip) dialog.showModal();
  $: disabled = !validate(value);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions-->
<dialog
  on:keydown|stopPropagation={(e) => {
    if (e.key === "Escape") {
      e.preventDefault();
    }
  }}
  bind:this={dialog}
  on:close={() => {
    showQuiz = false;
    dispatch("close");
  }}
>
  <div>
    <h1>この色は何色？</h1>
    <p style="background:{quiz.getColor()}">{quiz.getColor()}</p>
    <hr />
    <p>
      {quiz.getMaskedDescription()}
    </p>
    <hr />
    <input
      type="text"
      bind:value
      name="color"
      placeholder="漢字{quiz.getColorName()[0].length}文字で入力"
      on:change={() => validate(value) && dialog.close()}
    />
    <button {disabled} on:click={() => dialog.close()}>答えを確定する！</button>
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
  button {
    display: block;
  }
</style>
