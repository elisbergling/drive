import { writable, readable, derived } from "svelte/store";

export let path = writable("drive");

export let currentDoc = writable();

export let derivedPath = derived(path, ($path) =>
  $path.split("folders/").join("")
);
