module default {
  type User {
    required property username -> str {constraint exclusive;};
    required property password -> str;
  }
}
