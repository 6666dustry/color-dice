<script lang="ts">
  export let goal: boolean;
  let goalLog: HTMLDialogElement;
  $: if (goalLog && goal) goalLog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions-->
<dialog
  bind:this={goalLog}
  on:click={() => goalLog.close()}
  on:keydown={() => goalLog.close()}
  on:close={() => (goal = false)}
>
  <div><p>ゴール!</p></div>
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
