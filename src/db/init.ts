import { Client } from "pg";
import 'dotenv/config';

const init = async () => {
  try {
    const client = new Client({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PWD,
      host: 'localhost',
      database: 'dev',
      port: 5432,
    });

    await client.connect();

    // create users
    await client.query(`
    CREATE TABLE IF NOT EXISTS public."Users"
    (
    id character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS public."Users"
    OWNER to "secureUser@email.com";
    `);

    // create customers
    await client.query(`
    CREATE TABLE IF NOT EXISTS public."Customers"
    (
    id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    surname character varying COLLATE pg_catalog."default" NOT NULL,
    photo character varying COLLATE pg_catalog."default",
    CONSTRAINT "Customers_pkey" PRIMARY KEY (id)
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS public."Customers"
    OWNER to "secureUser@email.com";
    `);

    await client.end();
  } catch (err) {
    console.error(err);
  }
}

init();