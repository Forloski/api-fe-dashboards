CREATE MIGRATION m1n6g5v53gh43hfcd7zbpszkkuvavv7kac5n5brmpy4i6kvosfxzwa
    ONTO m1v4cfcttcyz3bp3djxgn4mzslsf6ykuthlsnqs2qqe22dcca3422q
{
  ALTER TYPE default::User {
      DROP LINK activeRefreshToken;
  };
};
