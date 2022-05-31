CREATE MIGRATION m1omparmwwyjavqgd263gjzqmyzh27ei5csfcrbt6qslbhr5zq7tpq
    ONTO m1z4qbrr2mjayg3flcmeek3xzwrz34ezdvtxw5wr7mj2ybe6ci72za
{
  ALTER TYPE default::RefreshToken {
      DROP LINK user;
      DROP PROPERTY expiresAt;
      DROP PROPERTY isRevoked;
  };
  ALTER TYPE default::User {
      DROP LINK activeRefreshToken;
  };
  DROP TYPE default::RefreshToken;
};
