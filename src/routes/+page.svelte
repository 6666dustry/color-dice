<script>
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
</script>

<main>
  <h1>色サイコロ</h1>
  <div>
    <button on:click={() => goto(base + "/jp")}>和色</button>
    <button on:click={() => goto(base + "/en")} disabled>洋色</button>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 18px;
    background-color: royalblue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:disabled {
    background-color: gray;
    cursor: default;
  }
  div {
    display: flex;
    flex-direction: column;
  }
</style>
