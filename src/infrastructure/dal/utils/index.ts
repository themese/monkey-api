import { S3 } from "aws-sdk";
import { Client } from "pg"

export const initDbClient = () => {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PWD,
    host: 'localhost',
    database: 'dev',
    port: 5432,
  });
  client.connect();
  return client;
}

export const initS3 = () => {
  return new S3({
    region: process.env.AWS_REGION,
  });
}