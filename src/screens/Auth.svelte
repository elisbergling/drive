<script>
  import { auth, db } from "../firebase";
  import { User } from "../models/user";
  let isLoading = false;
  let error = "";
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
    isLoading = true;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((_) => {
        isLoading = false;
        error = "";
      })
      .catch((e) => {
        error = e;
        isLoading = false;
      });
  }

  function signUp() {
    isLoading = true;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.collection("users")
          .doc(user.user.uid)
          .set(new User(user.user.uid, name, username, email, [], []).toJson());
        isLoading = false;
        error = "";
      })
      .catch((e) => {
        error = e;
        isLoading = false;
      });
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

<div class="columns is-centered">
  <div class="column is-narrow">
    <div class="row is-half">
      <div class="box has-background-primary-light mx-6 my-6">
        <p class="title is-3">Welcome to Baba Drive</p>
        {#if isSignUp}
          <div class="field">
            <input
              class="input"
              type="text"
              bind:value={name}
              placeholder="name"
            />
          </div>
          <div class="field">
            <input
              class="input"
              type="text"
              bind:value={username}
              placeholder="username"
            />
          </div>
        {/if}
        <div class="field">
          <input
            class="input"
            type="email"
            bind:value={email}
            placeholder="email"
          />
        </div>
        <div class="field">
          <input
            class="input"
            type="password"
            bind:value={password}
            placeholder="password"
          />
        </div>
        <p class="mb-2 has-text-danger">{error}</p>
        {#if isLoading}
          <button class="button is-primary is-loading">Loading </button>
        {:else}
          <input
            class="button is-primary"
            type="button"
            value={shouldSignUpText}
            on:click={authMethod}
          />
        {/if}
      </div>
    </div>
    <div class="row">
      <div class="columns is-vcentered mx-6 my-6">
        <div class="column">{shouldSwitchAuthText}</div>
        <div class="column is-narrow">
          <input
            class="button is-primary is-outlined"
            type="button"
            value={shouldSwitchAuthButtonText}
            on:click={toggleIsSignUp}
          />
        </div>
      </div>
    </div>
  </div>
</div>
