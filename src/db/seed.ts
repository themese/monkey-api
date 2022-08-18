import { Client } from "pg";

const connectDb = async () => {
  try {
    const client = new Client({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PWD,
      host: 'localhost',
      port: 5432,
    });

    await client.connect();
    const res = await client.query('SELECT * FROM table');
    console.log(res);
    await client.end();
  } catch (err) {
    console.error(err);
  }
}