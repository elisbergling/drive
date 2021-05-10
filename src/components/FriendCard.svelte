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
    if ((isAdd || isRequest) && !user.friendsUids.includes(uid)) {
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
    } else if (isFriends || user.friendsUids.includes(uid)) {
      path.set(`${user.uid}/drive`);
      currentUsername.set(user.username);
    }
  }

  function del() {
    if (isAdd) {
      myRef.update({
        friendsUids: fieldValue.arrayRemove(user.uid),
      });
      ref.update({
        friendsUids: fieldValue.arrayRemove(uid),
      });
    } else if (isRequest) {
      ref.update({
        requestUids: fieldValue.arrayRemove(uid),
      });
    }
  }
</script>

<div class="is-flex is-flex-direction-row is-align-items-center">
  <button class="button is-primary my-2" on:click={onClick}>
    <p class="has-text-weight-bold pr-3">{user.name}</p>
    <p>{user.username}</p>

    {#if !isFriends && (!user.friendsUids.includes(uid) || isRequest)}
      <Icon class="ml-2" data={userPlus} />
    {/if}
  </button>
  {#if user.friendsUids.includes(uid) || isRequest}
    <button class="delete ml-2" on:click={del} />
  {/if}
</div>
