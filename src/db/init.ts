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


    await client.query(`
    CREATE TABLE IF NOT EXISTS public."Roles"
    (
    id SERIAL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Roles_pkey" PRIMARY KEY (id)
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS public."Roles"
    OWNER to "secureUser@email.com";

    CREATE TABLE IF NOT EXISTS public."Users"
    (
    id SERIAL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    "roleId" integer NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email),
    CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId")
        REFERENCES public."Roles" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS public."Users"
    OWNER to "secureUser@email.com";

    CREATE TABLE IF NOT EXISTS public."Customers"
    (
    id SERIAL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    surname character varying COLLATE pg_catalog."default" NOT NULL,
    photo character varying COLLATE pg_catalog."default",
    "createdBy" integer NOT NULL,
    "lastUpdatedBy" integer NOT NULL,
    "isDeleted" boolean DEFAULT false,
    CONSTRAINT "Customers_pkey" PRIMARY KEY (id),
    CONSTRAINT "Customers_createdBy_fkey" FOREIGN KEY ("createdBy")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Customers_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
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