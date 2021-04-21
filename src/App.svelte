<script>
  import Auth from "./screens/Auth.svelte";
  import Home from "./screens/Home.svelte";
  import { auth } from "./firebase";
  import { FirebaseApp } from "sveltefire";
  import firebase from "firebase/app";
  let isSignedIn;
  auth.onAuthStateChanged((user) => {
    isSignedIn = user;
  });
</script>

<FirebaseApp {firebase}>
  {#if isSignedIn}
    <Home />
  {:else}
    <Auth />
  {/if}
</FirebaseApp>
