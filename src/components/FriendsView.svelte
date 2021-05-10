<script>
  import { auth } from "../firebase";
  import { Collection } from "sveltefire";
  import FriendCard from "../components/FriendCard.svelte";

  let query = (ref) =>
    ref.where("friendsUids", "array-contains", auth.currentUser.uid);
</script>

<div class="box has-background-primary-light">
  <Collection path={`users/`} {query} let:ref let:data={users}>
    <p class="has-text-weight-bold">Friends({users.length})</p>
    {#each users as user}
      <FriendCard {user} isFriends={true} />
    {/each}
  </Collection>
</div>
