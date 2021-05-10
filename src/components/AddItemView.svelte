<script>
  import { path } from "../stores";
  import { auth, db, fieldValue } from "../firebase";
  import { Document } from "../models/document";
  import { uid } from "uid";
  let user = auth.currentUser;
  let addType = "none";
  let name = "";

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
    let foldersDocRef = db.doc(`users/${$path}/folders`);
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

    db.doc(`users/${$path}/${id}/`).set(document.toJson());
  }
</script>

{#if $path.split("/")[0] == user.uid}
  <div class="box has-background-primary-light">
    <div class="columns">
      <div class="column is-narrow">
        <input
          class=" button is-primary is-outlined"
          type="button"
          value="New Folder"
          on:click={() => (addType = "folder name")}
        />
      </div>
      <div class="column is-narrow">
        <input
          class=" button is-primary is-outlined"
          type="button"
          value="New Document"
          on:click={() => (addType = "document name")}
        />
      </div>
      <div class="column is-narrow">
        <input
          class="button is-link is-light"
          type="button"
          value="Close"
          on:click={() => (addType = "none")}
        />
      </div>
    </div>

    {#if addType != "none"}
      <div class="columns is-mobile">
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
{/if}
