<script>
  import { currentDoc, path, isEdit } from "../stores";
  import { db, auth } from "../firebase";
  let user = auth.currentUser;
  function onSave() {
    db.doc(`users/${$path}/${$currentDoc.id}/`).update({
      text: $currentDoc.text,
      title: $currentDoc.title,
      isPrivate: $currentDoc.isPrivate,
    });
  }

  function onDelete() {
    db.doc(`users/${$path}/${$currentDoc.id}/`).delete();
    currentDoc.set(new Document("baba", "", false, "", ""));
  }

  function toogleIsEdit() {
    isEdit.update((e) => !e);
  }
</script>

<div class="box has-background-primary-light">
  {#if $currentDoc.id != "baba"}
    {#if $isEdit}
      <div class="field">
        <p>Title:</p>
        <input
          class="input"
          type="text"
          placeholder="title"
          bind:value={$currentDoc.title}
        />
      </div>
      <div class="field">
        <p>Text:</p>
        <textarea
          class="textarea"
          type="text"
          placeholder="text"
          bind:value={$currentDoc.text}
        />
      </div>

      <label class="checkbox field"
        ><input type="checkbox" bind:checked={$currentDoc.isPrivate} />
        Is Private: {$currentDoc.isPrivate}
      </label>

      <div class="field">
        <input
          class=" button is-primary"
          type="button"
          value="Save"
          on:click={onSave}
        />
        <input
          class=" button is-primary is-outlined"
          type="button"
          value="View"
          on:click={toogleIsEdit}
        />
        <input
          class="button is-danger is-outlined"
          type="button"
          value="Delete"
          on:click={onDelete}
        />
      </div>
    {:else}
      <div class="field">
        <p>Title:</p>
        <input
          class="input"
          type="text"
          placeholder="title"
          bind:value={$currentDoc.title}
          readonly
        />
      </div>
      <div class="field">
        <p>Text:</p>
        <textarea
          class="textarea"
          type="text"
          placeholder="text"
          bind:value={$currentDoc.text}
          readonly
        />
      </div>
      {#if $currentDoc.ownerUid == user.uid}
        <input
          class=" button is-primary is-outlined mt-3"
          type="button"
          value="Edit"
          on:click={toogleIsEdit}
        />
      {/if}
    {/if}
  {:else}
    <p>No document is currently selected</p>
  {/if}
</div>
