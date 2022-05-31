CREATE MIGRATION m1z4qbrr2mjayg3flcmeek3xzwrz34ezdvtxw5wr7mj2ybe6ci72za
    ONTO m17vwcnmhxscji4a7pdnzd3ff2x323xsmvpg4rd4f2u5alu7nz2hdq
{
  ALTER TYPE default::RefreshToken {
      DROP PROPERTY token;
  };
};
