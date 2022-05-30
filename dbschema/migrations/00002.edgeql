CREATE MIGRATION m1vuiniw3rpj7k645wiprwxbvjhykmp46eb6om2giqh7pqfbrotlra
    ONTO m1vmrjx7fw2yd5qloe6n6fw5sllnyjadida24ekv6vi26ga6coy7bq
{
  ALTER TYPE default::User {
      ALTER PROPERTY username {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
