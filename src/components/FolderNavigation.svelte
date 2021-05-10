<script>
  import { Collection, Doc } from "sveltefire";
  import { auth } from "../firebase";
  import { path } from "../stores";
  import Card from "../components/Card.svelte";
  let user = auth.currentUser;
  let myQuery = (ref) => ref.where("ownerUid", "==", user.uid);
  let query = (ref) => ref.where("isPrivate", "==", false);
</script>

<div class="box has-background-primary-light">
  <div class="columns">
    <Doc
      path={`users/${$path}/folders/`}
      let:ref={foldersRef}
      let:data={folders}
    >
      {#if folders["folders"].length != 0}
        <div class="column">
          <p class="mb-3 has-text-weight-bold">
            Folders({folders["folders"].length}):
          </p>
          {#each folders["folders"] as folder}
            <Card name={folder} isDoc={false} ref={foldersRef} />
          {/each}
        </div>
      {/if}
    </Doc>
    {#if $path.split("/")[0] == user.uid}
      <Collection
        path={`users/${$path}/`}
        query={myQuery}
        let:ref={docsRef}
        let:data={docs}
      >
        {#if docs.length != 0}
          <div class="column">
            <p class="mb-3 has-text-weight-bold">
              Documents({docs.length}):
            </p>
            {#each docs as doc}
              <Card name={doc.title} isDoc={true} ref={docsRef} {doc} />
            {/each}
          </div>
        {/if}
      </Collection>
    {:else}
      <Collection
        path={`users/${$path}/`}
        {query}
        let:ref={docsRef}
        let:data={docs}
      >
        {#if docs.length != 0}
          <div class="column">
            <p class="mb-3 has-text-weight-bold">
              Documents({docs.length}):
            </p>
            {#each docs as doc}
              <Card name={doc.title} isDoc={true} ref={docsRef} {doc} />
            {/each}
          </div>
        {/if}
      </Collection>
    {/if}
  </div>
</div>
