export class Document {
  constructor(id, text, isPrivate, title, ownerUid) {
    this.id = id;
    this.text = text;
    this.isPrivate = isPrivate;
    this.title = title;
    this.ownerUid = ownerUid;
  }

  static fromJson(json) {
    return Object.assign(new Document(), json);
  }

  toJson() {
    return {
      id: this.id,
      text: this.text,
      isPrivate: this.isPrivate,
      title: this.title,
      ownerUid: this.ownerUid,
    };
  }
}
