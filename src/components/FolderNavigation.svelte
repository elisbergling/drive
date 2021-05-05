<script>
  import { Collection, Doc } from "sveltefire";
  import { auth } from "../firebase";
  import { path } from "../stores";
  import Card from "../components/Card.svelte";
  let user = auth.currentUser;
</script>

<div class="box has-background-primary-light">
  <div class="columns">
    <div class="column">
      <p class="mb-3 has-text-weight-bold">Folders:</p>
      <Doc
        path={`users/${user.uid}/${$path}/folders/`}
        let:ref={foldersRef}
        let:data={folders}
      >
        {#each folders["folders"] as folder}
          <Card name={folder} isDoc={false} ref={foldersRef} />
        {/each}
      </Doc>
    </div>
    <div class="column">
      <p class="mb-3 has-text-weight-bold">Documents:</p>
      <Collection
        path={`users/${user.uid}/${$path}/`}
        let:ref={docsRef}
        let:data={docs}
      >
        {#each docs as doc}
          <Card name={doc.title} isDoc={true} ref={docsRef} {doc} />
        {/each}
      </Collection>
    </div>
  </div>
</div>
