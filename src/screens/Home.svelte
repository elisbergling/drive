<script>
  import { auth, db, fieldValue } from "../firebase";
  import { Document } from "../models/document";
  import { path, derivedPath } from "../stores";
  import { Collection, Doc } from "sveltefire";
  import { uid } from "uid";
  import Card from "../components/Card.svelte";
  import Auth from "./Auth.svelte";
  let user = auth.currentUser;
  let addType = "none";
  let name = "";
  //let docs = ["hello"];
  //let doc;
  //let folders = [];

  function addToPath(folder) {
    path.update((p) => p + `/${folder}`);
  }

  function removeFromPath() {
    if ($path.split("/").length != 1) {
      path.update((p) => {
        let ar = p.split("/");
        ar.pop();
        ar.pop();

        return ar.join("/");
      });
    }
  }

  function add() {
    if (addType == "folder name") {
      newFolder();
    } else if (addType == "document name") {
      newDocument();
    }
    name = "";
    addType = "none";
  }
  function newFolder() {
    let foldersDocRef = db.doc(`users/${user.uid}/${$path}/folders`);
    let data = {
      folders: fieldValue.arrayUnion(name),
    };
    foldersDocRef.get().then((foldersDoc) => {
      if (foldersDoc.exists) {
        foldersDocRef.update(data);
      } else {
        foldersDocRef.set(data);
      }
    });
  }

  function newDocument() {
    //TODO
    let id = uid(30);
    let ownerUid = auth.currentUser.uid;
    let document = new Document(id, "", false, name, ownerUid);

    db.doc(`users/${user.uid}/${path}/${id}/`).set(document.toJson());
  }

  function signOut() {
    auth.signOut();
  }
</script>

<main>
  <header>
    <h1>Home</h1>
    <p>{user.uid + " " + user.email}</p>
    <input type="button" on:click={signOut} value="Sign Out" />
  </header>
  <div id="content">
    <div id="first">
      <input
        type="button"
        value="New Folder"
        on:click={() => (addType = "folder name")}
      />
      <input
        type="button"
        value="New Document"
        on:click={() => (addType = "document name")}
      />
      <input type="button" value="Close" on:click={() => (addType = "none")} />
      {#if addType != "none"}
        <div id="add">
          <input type="text" bind:value={name} placeholder={addType} />
          <input type="button" value="Create" on:click={add} />
        </div>
      {/if}
    </div>
    <input type="button" value="Back" on:click={removeFromPath} />
    <p>path: {$derivedPath}</p>
    <div id="folders">
      <p>folders:</p>
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
    <div id="documents">
      <p>documents:</p>
      <Collection
        path={`users/${user.uid}/${$path}/`}
        let:ref={docsRef}
        let:data={docs}
      >
        {#each docs as doc}
          <Card name={doc.title} isDoc={true} ref={docsRef} />
        {/each}
      </Collection>
    </div>
    <div id="document">No Document Selected</div>
  </div>
</main>

<style>
  main {
    padding: 0;
    margin: 0;
  }
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: antiquewhite;
    padding: 1rem;
  }

  #content {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  #add {
    display: flex;
    flex-direction: row;
  }
</style>
