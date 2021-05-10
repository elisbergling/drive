<script>
  import { auth } from "../firebase";
  import AddItemView from "../components/AddItemView.svelte";
  import PathView from "../components/PathView.svelte";
  import FolderNavigation from "../components/FolderNavigation.svelte";
  import DocumentView from "../components/DocumentView.svelte";
  import FriendsView from "../components/FriendsView.svelte";
  import AddFriend from "../components/AddFriend.svelte";
  import FriendRequests from "../components/FriendRequests.svelte";

  function signOut() {
    auth.signOut();
  }
</script>

<main>
  <nav class="navbar has-background-primary-light">
    <div class="navbar-brand navbar-item">
      <p class="title is-3 has-text-weight-bold">Baba Drive</p>
    </div>
    <div class="navbar-menu ">
      <div class="navbar-end">
        <div class="navbar-item">
          <input
            class="button is-primary"
            type="button"
            on:click={signOut}
            value="Sign Out"
          />
        </div>
      </div>
    </div>
  </nav>
  <div class="columns is-desktop mx-2 my-6 is-centered">
    <div class="column is-narrow">
      <FriendsView />
      <AddFriend />
      <FriendRequests />
    </div>
    <div class="column is-narrow">
      <AddItemView />
      <PathView />
      <FolderNavigation />
    </div>
    <div class="column is-narrow">
      <DocumentView />
    </div>
  </div>
</main>
