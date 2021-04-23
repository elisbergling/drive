import { writable, readable, derived } from "svelte/store";
import { Document } from "./models/document";

export let path = writable("drive");

export let currentDoc = writable(new Document("baba", "", false, "", ""));

export let docRef = writable();

export let derivedPath = derived(path, ($path) =>
  $path.split("folders/").join("")
);
