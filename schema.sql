CREATE TABLE "customers" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "email" varchar UNIQUE,
  "address" text,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp,
  "reference" varchar UNIQUE
);

CREATE TABLE "regions" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "payment_methods" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "products" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "unit_price" float,
  "category_id" integer,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp,
  "reference" varchar UNIQUE
);

CREATE TABLE "orders" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "customer_id" integer,
  "payment_method" interger,
  "date_of_sale" date,
  "quantity" integer,
  "discount" float,
  "shipping_cost" float,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp,
  "reference" varchar UNIQUE,
  "region": varchar
  "meta" json
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("payment_method") REFERENCES "payment_methods" ("id");
