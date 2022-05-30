CREATE MIGRATION m1vmrjx7fw2yd5qloe6n6fw5sllnyjadida24ekv6vi26ga6coy7bq
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY password -> std::str;
      CREATE REQUIRED PROPERTY username -> std::str;
  };
};
