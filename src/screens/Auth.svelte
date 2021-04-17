<script>
  import { auth, db } from "../firebase";
  import { User } from "../models/user";
  import { fade } from "svelte/transition";
  let name = "";
  let username = "";
  let email = "";
  let password = "";
  let isSignUp = true;
  let shouldSignUpText = "Sign Up";
  let shouldSwitchAuthButtonText = "Log In";
  let shouldSwitchAuthText = "Already have an account?";
  let authMethod = signUp;

  function logIn() {
    auth.signInWithEmailAndPassword(email, password);
  }

  function signUp() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) =>
        db
          .collection("users")
          .doc(user.user.uid)
          .set(new User(user.user.uid, name, username, email, [], []).toJson())
      );
  }

  function toggleIsSignUp() {
    isSignUp = !isSignUp;
    if (isSignUp) {
      shouldSignUpText = "Sign Up";
      shouldSwitchAuthButtonText = "Log In";
      shouldSwitchAuthText = "Already have an account?";
      authMethod = signUp;
    } else {
      shouldSignUpText = "Log In";
      shouldSwitchAuthButtonText = "Sign Up";
      shouldSwitchAuthText = "Don't have an account yet?";
      authMethod = logIn;
    }
  }
</script>

<main>
  <div id="authCard" transistion:fade>
    <p>Welcome to BABA Drive</p>
    {#if isSignUp}
      <input type="text" bind:value={name} placeholder="name" />
      <input type="text" bind:value={username} placeholder="username" />
    {/if}
    <input type="email" bind:value={email} placeholder="email" />
    <input type="password" bind:value={password} placeholder="password" />
    <input type="button" value={shouldSignUpText} on:click={authMethod} />
  </div>
  <div id="shouldSignUp">
    <p>{shouldSwitchAuthText}</p>
    <input
      type="button"
      value={shouldSwitchAuthButtonText}
      on:click={toggleIsSignUp}
    />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  input[type="button"] {
    background-color: aquamarine;
  }
  input[type="button"]:hover {
    background-color: cornflowerblue;
  }

  #authCard {
    display: flex;
    flex-direction: column;
    background-color: bisque;
    padding: 3rem;
    margin: 5rem;
    border-radius: 1rem;
  }

  #shouldSignUp {
    display: flex;
    flex-direction: row;
  }
</style>
