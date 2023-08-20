<script lang="ts">
  import { goto } from "$app/navigation";
  import { players } from "../players.js";
  import { name, hex } from "../square/quizzes.js";
  import { reset } from "./reset.js";
  import { base } from "$app/paths";
</script>

<h1>ゲーム終了！！！</h1>
<ul>
  {#each $players as player, i}
    <li style="background-color:{player.color[hex]}">
      <span>プレイヤー{i + 1}</span>
      <span>{player.color[name]}</span>
      {#if player.goaled}
        <span>{player.rank + 1}位</span>
      {:else}
        <span>ゴールしていません！（{player.pos}マス目で終了）</span>
      {/if}
    </li>
  {/each}
</ul>
<button
  on:click={() => {
    reset();
    goto("/jp");
  }}>もう一回プレイする！</button
>
<button on:click={() => goto(base + "/")}>最初に戻る</button>
