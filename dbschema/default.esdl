module default {
  type User {
    required property username -> str { constraint exclusive };
    required property password -> str;
  }

  type RefreshToken {
    required property ipAddress -> str;
    required property userAgent -> str;
    required property expiresAt -> datetime;
    required link user -> User { constraint exclusive };
  }
}
