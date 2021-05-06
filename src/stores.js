import { writable, derived } from "svelte/store";
import { Document } from "./models/document";

export let path = writable();

export let currentDoc = writable(new Document("baba", "", false, "", ""));

export let docRef = writable();

export let currentUsername = writable("waiting");

export let derivedPath = derived([path, currentUsername], ($data) => {
  let ar = $data[0].split("/");
  ar.splice(0, 1);
  ar.unshift($data[1]);

  return ar.filter((name) => name != "folders").join("/");
});
