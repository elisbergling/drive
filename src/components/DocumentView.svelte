<script>
  import { currentDoc, path, docRef } from "../stores";
  import { db, auth } from "../firebase";
  import { Document } from "../models/document";
  let text = $currentDoc.text;
  let title = $currentDoc.title;
  let user = auth.currentUser;
  function onSave() {
    db.doc(`users/${user.uid}/${$path}/${$currentDoc.id}/`).update({
      text: $currentDoc.text,
      title: $currentDoc.title,
    });
  }
</script>

<div id="root">
  {#if $currentDoc.id != "baba"}
    <h1>Title: {$currentDoc.title}</h1>
    <p>Text:</p>
    <input type="text" placeholder="text" bind:value={$currentDoc.text} />
    <p>Is Private: {$currentDoc.isPrivate}</p>
    <input type="button" value="Save Doc" on:click={onSave} />
  {:else}
    <p>No DOCUEMNT is fuckING selected</p>
  {/if}
</div>

<style>
  #root {
    height: 80vh;
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
</style>
