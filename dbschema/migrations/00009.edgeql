CREATE MIGRATION m1amqstwzjog2w3232pht6s7eydzdskekgmbfqb2ba37dj5r5eoypa
    ONTO m1tlkv6o4cnevt35lsjkedjqfyng5vbf7euoxbcm7fp5wxdokivdkq
{
  ALTER TYPE default::RefreshToken {
      DROP PROPERTY userAgent;
  };
};
