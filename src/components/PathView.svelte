<script>
  import { path, derivedPath } from "../stores";
  function removeFromPath() {
    if ($path.split("/").length != 2) {
      path.update((p) => {
        let ar = p.split("/");
        ar.pop();
        ar.pop();

        return ar.join("/");
      });
    }
  }
</script>

<div class="box has-background-primary-light">
  <div class="columns is-mobile is-align-items-center">
    <div class="column is-narrow">
      <input
        class="button is-info is-light"
        type="button"
        value="Back"
        on:click={removeFromPath}
      />
    </div>

    <p class="column"><strong>path:</strong> {$derivedPath}</p>
  </div>
</div>
