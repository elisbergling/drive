<script>
  import { Collection } from "sveltefire";
  import FriendCard from "../components/FriendCard.svelte";
  let search = "";

  let query = (ref) => ref;
  $: {
    query = (ref) =>
      ref
        .where("username", ">=", search)
        .where("username", "<=", search + "\uf8ff")
        .limit(5);
  }
</script>

<div class="box has-background-primary-light">
  <p class="has-text-weight-bold">Add Friends</p>
  <input
    type="text"
    class="input my-2"
    bind:value={search}
    placeholder="Search by username..."
  />
  <Collection path={`users/`} {query} let:ref let:data={users}>
    {#each users as user (user.uid)}
      <FriendCard {user} isAdd={true} />
    {/each}
  </Collection>
</div>
