import { Client } from "pg";
import 'dotenv/config';

const connectDb = async () => {
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
    INSERT INTO public."Roles"("name")
    VALUES ('user'), ('admin');
    
    INSERT INTO public."Users"("email", "roleId")
	  VALUES ('jousema.fernandez@gmail.com',  2), 
    ('flavia.marsano@agilemonkeys.com',  1),
    ('nick@agilemonkeys.com',  1);

    INSERT INTO public."Customers"("name", "surname", "photo", "createdBy", "lastUpdatedBy")
	  VALUES ('Josema', 'Fernandez', '', 1, 1),
    ('UserName0', 'UserSurname0', '', 1, 2),
    ('UserName1', 'UserSurname1', '', 2, 1),
    ('UserName2', 'UserSurname2', '', 2, 2);
    `);
    await client.end();
  } catch (err) {
    console.error(err);
  }
}

connectDb();