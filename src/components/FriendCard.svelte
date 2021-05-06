<script>
  import { auth, db, fieldValue } from "../firebase";
  import { path, currentUsername } from "../stores";
  import Icon from "svelte-awesome";
  import { userPlus } from "svelte-awesome/icons";
  let uid = auth.currentUser.uid;

  export let user;
  export let isFriends = false;
  export let isAdd = false;
  export let isRequest = false;

  let myRef = db.doc(`users/${uid}/`);
  let ref = db.doc(`users/${user.uid}/`);

  function onClick() {
    if (isAdd || isRequest) {
      if (user.friendsUids.includes(uid)) {
        return;
      } else {
        if (user.requestUids.includes(uid)) {
          ref.update({
            requestUids: fieldValue.arrayRemove(uid),
          });
          myRef.update({
            friendsUids: fieldValue.arrayUnion(user.uid),
          });
          ref.update({
            friendsUids: fieldValue.arrayUnion(uid),
          });
        } else {
          myRef.update({
            requestUids: fieldValue.arrayUnion(user.uid),
          });
        }
      }
    } else if (isFriends) {
      path.update((p) => {
        let ar = p.split("/");
        ar.splice(0, 1);
        ar.unshift(user.uid);
        return ar.join("/");
      });
      currentUsername.set(user.username);
    }
  }
</script>

<div>
  <button class="button is-primary my-2" on:click={onClick}>
    <p class="has-text-weight-bold pr-3">{user.name}</p>
    <p>{user.username}</p>
    {#if !isFriends}
      <Icon class="ml-2" data={userPlus} />
    {/if}
  </button>
</div>
