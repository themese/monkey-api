import { Client, QueryResult } from "pg";
import { NewRole, Role, RoleId } from "@src/domain-model/role";
import { RoleRepository } from "@src/domain-services/role.repository";
import { initDbClient } from "./utils";

const rolesDb = 'public."Roles"';

export class RoleRepositoryImpl implements RoleRepository {
  private readonly _clientDb: Client;
  constructor() {
    this._clientDb = initDbClient();
  }

  async createRole(newRole: NewRole) {
    const { name } = newRole;
    const dbCreatedResponse: QueryResult<{ id: RoleId }> = await this._clientDb.query(`
      INSERT INTO ${rolesDb} ("name")
      VALUES ('${name}')
      RETURNING id;
    `);
    const dbResponse: QueryResult<Role> = await this._clientDb.query(`
      SELECT * FROM ${rolesDb}
      WHERE id=${dbCreatedResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  }

  async getRole(id: RoleId) {
    const dbResponse: QueryResult<Role> = await this._clientDb.query(`
      SELECT * FROM ${rolesDb}
      WHERE id=${id}
      ORDER BY  id ASC
      limit 1;
    `);
    return dbResponse.rows[0];
  }

  async getRoles() {
    const dbResponse: QueryResult<Role> = await this._clientDb.query(`
      SELECT * FROM ${rolesDb}
      ORDER BY id ASC;
      `);
    return dbResponse.rows;
  }

  async updateRole(role: Role) {
    const { id, name } = role;
    const dbUpdateResponse: QueryResult<{ id: RoleId }> = await this._clientDb.query(`
      UPDATE ${rolesDb}
      SET name='${name}'
      WHERE id=${id}
      RETURNING id;
  `);
    const dbResponse: QueryResult<Role> = await this._clientDb.query(`
      SELECT * FROM ${rolesDb}
      WHERE id=${dbUpdateResponse.rows[0].id}
      ORDER BY  id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  }

  async deleteRole(id: RoleId) {
    await this._clientDb.query(`
      DELETE FROM ${rolesDb}
      WHERE id=${id};
    `);
  }

}