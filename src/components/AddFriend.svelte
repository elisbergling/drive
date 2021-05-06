<script>
  import { Collection } from "sveltefire";
  import FriendCard from "../components/FriendCard.svelte";
</script>

<div class="box has-background-primary-light">
  <p class="has-text-weight-bold">Add Friends</p>

  <Collection path={`users/`} let:ref let:data={users}>
    {#each users as user}
      <FriendCard {user} isAdd={true} />
    {/each}
  </Collection>
</div>
