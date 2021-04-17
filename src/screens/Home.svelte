<script>
  import { auth } from "../firebase";
  function signOut() {
    auth.signOut();
  }
</script>

<p>Home</p>
<input type="button" on:click={signOut} value="Sign Out" />
