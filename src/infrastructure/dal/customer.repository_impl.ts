import { NotAcceptableException } from "@nestjs/common";
import { Client, QueryResult } from "pg";
import { NewCustomer, Customer, CustomerId } from "src/domain_model/customer";
import { UserId } from "src/domain_model/user";
import { CustomerRepository } from "src/domain_services/customer.repository";
import { initDbClient } from "./utils";

const customers = 'public."Customers"';
export class CustomerRepositoryImpl implements CustomerRepository {
  private readonly _clientDb: Client;
  constructor() {
    this._clientDb = initDbClient();
  }
  async createCustomer(newCustomer: NewCustomer, createdBy: UserId) {
    const { name, surname, photo } = newCustomer;
    const dbCreatedResponse: QueryResult<{ id: CustomerId }> = await this._clientDb.query(`
      INSERT INTO ${customers}("name", "surname", "photo", "createdBy", "lastUpdatedBy")
      VALUES ('${name}', '${surname}', '${photo}', '${createdBy}', '${createdBy}')
      RETURNING id;
    `);
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customers}
      WHERE id=${dbCreatedResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  };
  async getCustomer(id: CustomerId) {
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customers}
      WHERE id=${id}
      ORDER BY id ASC
      limit 1;
    `);
    const customer = dbResponse.rows[0];

    if (customer.isDeleted) {
      throw new NotAcceptableException('Customer was previously softly deleted, but the record does exist in the DB.');
    }

    return customer;
  };
  async getCustomers() {
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customers}
      ORDER BY id ASC;
    `);
    return dbResponse.rows;
  };
  async updateCustomer(customer: Customer, updatedBy: UserId) {
    const { id, name, surname, photo, createdBy, isDeleted } = customer;
    const dbUpdateResponse: QueryResult<{ id: CustomerId }> = await this._clientDb.query(`
      UPDATE ${customers}
      SET id=${id}, name='${name}', surname='${surname}', photo='${photo}', "createdBy"=${createdBy}, "lastUpdatedBy"=${updatedBy}, "isDeleted"=${isDeleted}
      WHERE id=${id}
      RETURNING id;
    `);
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customers}
      WHERE id=${dbUpdateResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);
    return dbResponse.rows[0];
  };
  async deleteCustomer(id: CustomerId, updatedBy: UserId) {
    const dbCustomerResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customers}
      WHERE id=${id}
      ORDER BY id ASC
      limit 1;
    `);
    const { name, surname, photo, createdBy } = dbCustomerResponse.rows[0];
    const dbUpdateResponse: QueryResult<{ id: CustomerId }> = await this._clientDb.query(`
      UPDATE ${customers}
      SET id=${id}, name='${name}', surname='${surname}', photo='${photo}', "createdBy"=${createdBy}, "lastUpdatedBy"=${updatedBy}, "isDeleted"=true
      WHERE id=${id}
      RETURNING id;
    `);
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customers}
      WHERE id=${dbUpdateResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);
    return dbResponse.rows[0];
  };

}