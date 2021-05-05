<script>
  import { Collection } from "sveltefire";
  import Card from "../components/Card.svelte";
</script>

<div class="box has-background-primary-light">
  <p>Friends</p>

  <!-- <Collection path={`users/`} let:ref={docsRef} let:data={docs}>
    {#each docs as doc}
      <Card name={doc.title} isDoc={true} ref={docsRef} {doc} />
    {/each}
  </Collection> -->
</div>
