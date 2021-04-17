<script>
  import Auth from "./screens/Auth.svelte";
  import Home from "./screens/Home.svelte";
  import { auth } from "./firebase";
  let isSignedIn;
  auth.onAuthStateChanged((user) => {
    isSignedIn = user;
  });
</script>

{#if isSignedIn}
  <Home />
{:else}
  <Auth />
{/if}
