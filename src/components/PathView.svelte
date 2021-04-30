<script>
  import { path, derivedPath } from "../stores";
  function removeFromPath() {
    if ($path.split("/").length != 1) {
      path.update((p) => {
        let ar = p.split("/");
        ar.pop();
        ar.pop();

        return ar.join("/");
      });
    }
  }
</script>

<div class="columns">
  <input
    class="column button"
    type="button"
    value="Back"
    on:click={removeFromPath}
  />
  <p class="column"><strong>path:</strong> {$derivedPath}</p>
</div>
