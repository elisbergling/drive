<script>
  import Auth from "./screens/Auth.svelte";
  import Home from "./screens/Home.svelte";
  import { auth, db } from "./firebase";
  import { FirebaseApp } from "sveltefire";
  import { path, currentUsername } from "./stores";
  import firebase from "firebase/app";
  let isSignedIn;
  let isWaiting = true;

  auth.onAuthStateChanged((user) => {
    isSignedIn = user;
    if (isSignedIn != null) {
      path.set(`${user.uid}/drive`);
      db.doc(`users/${user.uid}`)
        .get()
        .then((doc) => currentUsername.set(doc.data().username));
    }
    isWaiting = false;
  });
</script>

<FirebaseApp {firebase}>
  {#if !isWaiting}
    {#if isSignedIn}
      <Home />
    {:else}
      <Auth />
    {/if}
  {:else}
    <div class="control is-loading is-large is-centered" />
  {/if}
</FirebaseApp>
