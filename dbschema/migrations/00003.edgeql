CREATE MIGRATION m17vwcnmhxscji4a7pdnzd3ff2x323xsmvpg4rd4f2u5alu7nz2hdq
    ONTO m1vuiniw3rpj7k645wiprwxbvjhykmp46eb6om2giqh7pqfbrotlra
{
  CREATE TYPE default::RefreshToken {
      CREATE REQUIRED LINK user -> default::User {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY expiresAt -> std::datetime;
      CREATE REQUIRED PROPERTY isRevoked -> std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY token -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      CREATE LINK activeRefreshToken -> default::RefreshToken {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
