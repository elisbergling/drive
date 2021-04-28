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
  <div class="block">
    <div class="button is-primary " on:click={onClick}>
      {#if isDoc}
        <Icon data={file} />
      {:else}
        <Icon data={folder} />
      {/if}

      <p class="title is-6 ">__{name}</p>
    </div>
  </div>
{/if}
