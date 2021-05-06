<script>
  import { Collection, Doc } from "sveltefire";
  import { path } from "../stores";
  import Card from "../components/Card.svelte";
</script>

<div class="box has-background-primary-light">
  <div class="columns">
    <Doc
      path={`users/${$path}/folders/`}
      let:ref={foldersRef}
      let:data={folders}
    >
      <div class="column">
        {#if folders.length != 0}
          <p class="mb-3 has-text-weight-bold">Folders:</p>
          {#each folders["folders"] as folder}
            <Card name={folder} isDoc={false} ref={foldersRef} />
          {/each}
        {/if}
      </div>
    </Doc>
    <Collection path={`users/${$path}/`} let:ref={docsRef} let:data={docs}>
      <div class="column">
        {#if docs.length != 1}
          <p class="mb-3 has-text-weight-bold">Documents:</p>
          {#each docs as doc}
            <Card name={doc.title} isDoc={true} ref={docsRef} {doc} />
          {/each}
        {/if}
      </div>
    </Collection>
  </div>
</div>
