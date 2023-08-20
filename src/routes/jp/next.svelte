<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { dice, getPlayer } from "./players.js";
  import { players } from "./players.js";
  import { hex, name } from "./square/quizzes.js";
  import { debug } from "./mode.js";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  const dispatch = createEventDispatcher();
</script>

<div>
  <ul>
    {#each $players as player, i}
      <li style="background-color:{player.color[hex]}">
        <span>プレイヤー{i + 1}</span>
        <span>{player.color[name]}</span>
        {#if player.goaled}
          <span>ゴール！</span>
        {:else}
          <span>{player.pos}マス目</span>
        {/if}
        {#if debug}
          <input
            on:change={(e) => (player.pos = e.currentTarget.valueAsNumber)}
            type="number"
          />
        {/if}
      </li>
    {/each}
  </ul>
</div>
<button
  on:click={() => {
    const p = getPlayer();
    if (!p.goaled) {
      if (dice() === -1) {
        goto(base + "/jp/game-end");
      }
    }
    dispatch("diced");
  }}
  >次に進む
</button>

<style>
  ul {
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-flow: column;
  }
  li {
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
  span {
    display: inline-block;
    text-align: center;
  }
</style>
