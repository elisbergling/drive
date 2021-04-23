<script>
  import Auth from "../screens/Auth.svelte";
  import Icon from "svelte-awesome";
  import { folder, file } from "svelte-awesome/icons";
  import { path, currentDoc, docRef } from "../stores";

  export let name;
  export let isDoc;
  export let doc;
  export let ref;

  function onClick() {
    if (isDoc) {
      currentDoc.update((_) => doc);
      docRef.update((_) => ref);
    } else {
      path.update((p) => p + `/folders/${name}`);
      console.log(path);
    }
  }
</script>

{#if name != null}
  <div class="main" on:click={onClick}>
    {#if isDoc}
      <Icon data={file} />
    {:else}
      <Icon data={folder} />
    {/if}

    <h5>{name}</h5>
  </div>
{/if}

<style>
  .main {
    display: flex;
    padding-left: 0;
    padding-bottom: 0;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.5rem;
    border: 0.2rem solid black;

    border-radius: 1rem;
    transition: 300ms;
  }

  .main:hover {
    background-color: beige;
  }
</style>
