<script>
  import Auth from "./screens/Auth.svelte";
  import Home from "./screens/Home.svelte";
  import { auth, db } from "./firebase";
  import { FirebaseApp } from "sveltefire";
  import { path, currentUsername } from "./stores";
  import firebase from "firebase/app";
  let isSignedIn;

  auth.onAuthStateChanged((user) => {
    isSignedIn = user;
    path.set(`${user.uid}/drive`);
    db.doc(`users/${user.uid}`)
      .get()
      .then((doc) => currentUsername.set(doc.data().username));
  });
</script>

<FirebaseApp {firebase}>
  {#if isSignedIn}
    <Home />
  {:else}
    <Auth />
  {/if}
</FirebaseApp>
