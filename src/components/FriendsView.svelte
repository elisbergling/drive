<script>
  import { auth } from "../firebase";
  import { Collection } from "sveltefire";
  import FriendCard from "../components/FriendCard.svelte";

  let query = (ref) =>
    ref.where("friendsUids", "array-contains", auth.currentUser.uid);
</script>

<div class="box has-background-primary-light">
  <p class="has-text-weight-bold">Friends</p>

  <Collection path={`users/`} {query} let:ref let:data={users}>
    {#each users as user}
      <FriendCard {user} isFriends={true} />
    {/each}
  </Collection>
</div>
