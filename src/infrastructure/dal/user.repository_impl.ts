import { Client, QueryResult } from "pg";
import { NewUser, User, UserId } from "@src/domain-model/user";
import { UserRepository } from "@src/domain-services/user.repository";
import { initDbClient } from "./utils";

const usersDb = 'public."Users"';

export class UserRepositoryImpl implements UserRepository {
  private readonly _clientDb: Client;
  constructor() {
    this._clientDb = initDbClient();
  }

  async createUser(newUser: NewUser) {
    const { email, roleId } = newUser;
    const dbCreatedResponse: QueryResult<{ id: UserId }> = await this._clientDb.query(`
      INSERT INTO ${usersDb} ("email", "roleId")
      VALUES ('${email}', ${roleId})
      RETURNING id;
    `);
    const dbResponse: QueryResult<User> = await this._clientDb.query(`
      SELECT * FROM ${usersDb}
      WHERE id=${dbCreatedResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  }

  async getUser(id: UserId) {
    const dbResponse: QueryResult<User> = await this._clientDb.query(`
      SELECT * FROM ${usersDb}
      WHERE id=${id}
      ORDER BY  id ASC
      limit 1;
    `);
    return dbResponse.rows[0];
  }

  async getUsers() {
    const dbResponse: QueryResult<User> = await this._clientDb.query(`
      SELECT * FROM ${usersDb}
      ORDER BY id ASC;
      `);
    return dbResponse.rows;
  }

  async updateUser(user: User) {
    const { id, email, roleId } = user;
    const dbUpdateResponse: QueryResult<{ id: UserId }> = await this._clientDb.query(`
      UPDATE ${usersDb}
      SET "email"='${email}', "roleId"=${roleId}
      WHERE id=${id}
      RETURNING id;
  `);
    const dbResponse: QueryResult<User> = await this._clientDb.query(`
      SELECT * FROM ${usersDb}
      WHERE id=${dbUpdateResponse.rows[0].id}
      ORDER BY  id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  }

  async deleteUser(id: UserId) {
    const dbCustomerResponse: QueryResult<User> = await this._clientDb.query(`
      SELECT * FROM ${usersDb}
      WHERE id=${id}
      ORDER BY id ASC
      limit 1;
    `);
    const { email, roleId } = dbCustomerResponse.rows[0];
    const dbUpdateResponse: QueryResult<{ id: UserId }> = await this._clientDb.query(`
      UPDATE ${usersDb}
      SET "email"='${email}', "roleId"=${roleId}, "isDeleted"=true
      WHERE id=${id}
      RETURNING id;
    `);
    const dbResponse: QueryResult<User> = await this._clientDb.query(`
      SELECT * FROM ${usersDb}
      WHERE id=${dbUpdateResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  }
}