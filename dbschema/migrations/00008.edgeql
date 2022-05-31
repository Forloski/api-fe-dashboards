CREATE MIGRATION m1tlkv6o4cnevt35lsjkedjqfyng5vbf7euoxbcm7fp5wxdokivdkq
    ONTO m1n6g5v53gh43hfcd7zbpszkkuvavv7kac5n5brmpy4i6kvosfxzwa
{
  ALTER TYPE default::RefreshToken {
      DROP PROPERTY isRevoked;
  };
};
