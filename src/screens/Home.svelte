<script>
  import "bulma/css/bulma.css";
  import { auth, db, fieldValue } from "../firebase";
  import { Document } from "../models/document";
  import { path, derivedPath } from "../stores";
  import { Collection, Doc } from "sveltefire";
  import { uid } from "uid";
  import Card from "../components/Card.svelte";
  import DocumentView from "../components/DocumentView.svelte";
  import Auth from "./Auth.svelte";
  let user = auth.currentUser;
  let addType = "none";
  let name = "";

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
    let id = uid(30);
    let ownerUid = auth.currentUser.uid;
    let document = new Document(id, "", false, name, ownerUid);

    db.doc(`users/${user.uid}/${$path}/${id}/`).set(document.toJson());
  }

  function signOut() {
    auth.signOut();
  }
</script>

<main>
  <nav class="navbar has-background-primary">
    <div class="navbar-brand navbar-item">
      <p class="title is-3 has-text-weight-bold">Home</p>
    </div>
    <div class="navbar-menu navbar-end navbar-item">
      <input
        class="button "
        type="button"
        on:click={signOut}
        value="Sign Out"
      />
    </div>
  </nav>
  <div class="columns mx-6 my-6">
    <div class="column is-narrow">
      <div class="columns">
        <div class="column is-narrow">
          <input
            class=" button"
            type="button"
            value="New Folder"
            on:click={() => (addType = "folder name")}
          />
        </div>
        <div class="column is-narrow">
          <input
            class=" button"
            type="button"
            value="New Document"
            on:click={() => (addType = "document name")}
          />
        </div>
        <div class="column is-narrow">
          <input
            class="button is-light"
            type="button"
            value="Close"
            on:click={() => (addType = "none")}
          />
        </div>
      </div>

      {#if addType != "none"}
        <div class="columns">
          <div class="column">
            <input
              class="input"
              type="text"
              bind:value={name}
              placeholder={addType}
            />
          </div>
          <div class="column is-narrow">
            <input
              class="button is-primary"
              type="button"
              value="Create"
              on:click={add}
            />
          </div>
        </div>
      {/if}
    </div>
    <div class="column is-narrow">
      <input
        class=" button"
        type="button"
        value="Back"
        on:click={removeFromPath}
      />
      <p><strong>path:</strong> {$derivedPath}</p>
    </div>
    <div class="column">
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
    </div>
    <div class="column">
      <div id="documents">
        <p>documents:</p>
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
    <div class="column">
      <DocumentView />
    </div>
  </div>
</main>
