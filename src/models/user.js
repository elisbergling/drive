export class User {
  constructor(uid, name, username, email, friendsUids, requestUids) {
    this.uid = uid;
    this.name = name;
    this.username = username;
    this.email = email;
    this.friendsUids = friendsUids;
    this.requestUids = requestUids;
  }

  static fromJson(json) {
    return Object.assign(new User(), json);
  }

  toJson() {
    return {
      uid: this.uid,
      name: this.name,
      username: this.username,
      email: this.email,
      friendsUids: this.friendsUids,
      requestUids: this.requestUids,
    };
  }
}
