<script>
  import Icon from "svelte-awesome";
  import { folder, file } from "svelte-awesome/icons";
  import { path, currentDoc, docRef, isEdit } from "../stores";

  export let name;
  export let isDoc;
  export let doc;
  export let ref;

  function onClick() {
    if (isDoc) {
      currentDoc.set(doc);
      docRef.set(ref);
      isEdit.set(false);
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
        <Icon class="mr-2" data={file} />
      {:else}
        <Icon class="mr-2" data={folder} />
      {/if}
      <p class="has-text-weight-bold">{name}</p>
    </div>
  </div>
{/if}
