<script lang="ts">
  import { Player } from "./player.js";
  import { players } from "./players.js";
  import { getQuiz } from "./square/quizzes.js";
  function click() {
    $players.push(new Player(getQuiz()));
    $players = $players;
  }
</script>

<button on:click={click}>プレイヤーを追加</button>
