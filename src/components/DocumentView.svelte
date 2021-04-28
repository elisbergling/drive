<script>
  import { currentDoc, path, docRef } from "../stores";
  import { db, auth } from "../firebase";
  import { Document } from "../models/document";
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

<div id="root">
  {#if $currentDoc.id != "baba"}
    {#if isEdit}
      <h1>Title:</h1>
      <input type="text" placeholder="title" bind:value={$currentDoc.title} />
      <p>Text:</p>
      <input type="text" placeholder="text" bind:value={$currentDoc.text} />
      <div id="isPrivate">
        <input type="checkbox" bind:checked={$currentDoc.isPrivate} />
        <p>Is Private: {$currentDoc.isPrivate}</p>
      </div>

      <input type="button" value="Save Doc" on:click={onSave} />
      <input type="button" value="View Doc" on:click={toogleIsEdit} />
    {:else}
      <h1>Title: {$currentDoc.title}</h1>
      <p>Text: {$currentDoc.text}</p>
      <p>Is Private: {$currentDoc.isPrivate}</p>
      <input type="button" value="Edit Doc" on:click={toogleIsEdit} />
    {/if}
  {:else}
    <p>No DOCUEMNT is fuckING selected</p>
  {/if}
</div>

<style>
  #root {
    height: 50vh;
    width: 20rem;
    background-color: cornsilk;
    padding: 1rem;
    border-radius: 1rem;
    border: 0.2rem solid black;
    margin: 1rem;
  }
  p {
    font-size: medium;
  }

  #isPrivate {
    flex-direction: row;
    display: flex;
  }
</style>
