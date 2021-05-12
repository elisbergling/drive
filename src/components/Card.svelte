<script>
  import { auth, db, fieldValue } from "../firebase";
  import Icon from "svelte-awesome";
  import { folder, file } from "svelte-awesome/icons";
  import { path, currentDoc, docRef, isEdit } from "../stores";

  export let name;
  export let isDoc;
  export let doc;
  export let ref;

  let user = auth.currentUser;

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

  function del() {
    let foldersDocRef = db.doc(`users/${$path}/folders`);
    foldersDocRef.update({
      folders: fieldValue.arrayRemove(name),
    });
  }
</script>

{#if name != null}
  <div class="block">
    <div class="button is-primary" on:click={onClick}>
      {#if isDoc}
        <Icon class="mr-2" data={file} />
      {:else}
        <Icon class="mr-2" data={folder} />
      {/if}
      <p class="has-text-weight-bold">{name}</p>
    </div>
    {#if !isDoc && $path.split("/")[0] == user.uid}
      <button class="delete ml-2 mt-2" on:click={del} />
    {/if}
  </div>
{/if}
