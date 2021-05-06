<script>
  import { currentDoc, path, docRef } from "../stores";
  import { db, auth } from "../firebase";
  let user = auth.currentUser;
  let isEdit = false;
  function onSave() {
    db.doc(`users/${user.uid}/${$path}/${$currentDoc.id}/`).update({
      text: $currentDoc.text,
      title: $currentDoc.title,
      isPrivate: $currentDoc.isPrivate,
    });
  }

  function toogleIsEdit() {
    isEdit = !isEdit;
  }
</script>

<div class="box has-background-primary-light">
  {#if $currentDoc.id != "baba"}
    {#if isEdit}
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
          value="Save Doc"
          on:click={onSave}
        />
        <input
          class=" button is-primary is-outlined"
          type="button"
          value="View Doc"
          on:click={toogleIsEdit}
        />
      </div>
    {:else}
      <p class="title is-3">{$currentDoc.title}</p>
      <p>Text: {$currentDoc.text}</p>
      <input
        class=" button is-primary is-outlined mt-3"
        type="button"
        value="Edit Doc"
        on:click={toogleIsEdit}
      />
    {/if}
  {:else}
    <p>No DOCUEMNT is fuckING selected</p>
  {/if}
</div>
