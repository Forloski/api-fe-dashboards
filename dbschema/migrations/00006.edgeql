CREATE MIGRATION m1v4cfcttcyz3bp3djxgn4mzslsf6ykuthlsnqs2qqe22dcca3422q
    ONTO m1omparmwwyjavqgd263gjzqmyzh27ei5csfcrbt6qslbhr5zq7tpq
{
  CREATE TYPE default::RefreshToken {
      CREATE REQUIRED LINK user -> default::User {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY expiresAt -> std::datetime;
      CREATE REQUIRED PROPERTY ipAddress -> std::str;
      CREATE REQUIRED PROPERTY isRevoked -> std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY userAgent -> std::str;
  };
  ALTER TYPE default::User {
      CREATE LINK activeRefreshToken -> default::RefreshToken {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
