<script lang="ts">
  import { Board } from "./board.js";
  import { players, getAvailablePlayer } from "./players.js";
  import AddPlayer from "./add-player.svelte";
  import Next from "./next.svelte";
  import Modal from "./modals/modals.svelte";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  let answering = false;
  let player = getAvailablePlayer();
  let goaled = player?.goaled;
  $: {
    answering;
    player = getAvailablePlayer();
    goaled = player?.goaled;
  }
</script>

<h1>和色双六</h1>
<AddPlayer />

<Next
  on:diced={() => {
    answering = true;
  }}
/>
<div class="center">
  <div class="board">
    {#each Board.getBoard() as row}
      {#each row as square}
        <div class="cell" style={square.render($players)}>
          {square.pos}
        </div>
      {/each}
    {/each}
  </div>
</div>
<Modal bind:showQuiz={answering} {player} />
<button on:click={() => goto(base + "/")}>戻る</button>
<p>出典:<a href="https://irocore.com/">伝統色のいろは</a></p>
<style>
  h1 {
    text-align: center;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(6, min(12.5vh, 12.5vw));
    grid-template-rows: repeat(5, min(12.5vh, 12.5vw));
    gap: 2px;
    padding: min(1vh, 1vw);
    background-color: lightgray;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    background-color: white;
    border: 1px solid gray;
  }
</style>
