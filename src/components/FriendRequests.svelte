<script>
  import { auth } from "../firebase";
  import { Collection } from "sveltefire";
  import FriendCard from "../components/FriendCard.svelte";

  let query = (ref) =>
    ref.where("requestUids", "array-contains", auth.currentUser.uid);
</script>

<div class="box has-background-primary-light">
  <Collection path={`users/`} {query} let:ref let:data={users}>
    <p class="has-text-weight-bold">Friend Requests({users.length})</p>
    {#each users as user}
      <FriendCard {user} isRequest={true} />
    {/each}
  </Collection>
</div>
