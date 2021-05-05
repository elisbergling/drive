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
  <nav class="navbar has-background-primary">
    <div class="navbar-brand navbar-item">
      <p class="title is-3 has-text-weight-bold">BABA drive</p>
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
    <div class="column" />
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
    <div class="column" />
  </div>
</main>
