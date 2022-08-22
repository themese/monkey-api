import S3, { PutObjectRequest } from "aws-sdk/clients/s3";
import { createReadStream } from "fs";
import { Client, QueryResult } from "pg";
import { NewCustomer, Customer, CustomerId } from "src/domain_model/customer";
import { UserId } from "src/domain_model/user";
import { CustomerRepository } from "src/domain_services/customer.repository";
import { initDbClient, initS3 } from "./utils";

const customersDb = 'public."Customers"';
export class CustomerRepositoryImpl implements CustomerRepository {
  private readonly _clientDb: Client;
  private readonly _s3: S3;
  constructor() {
    this._clientDb = initDbClient();
    this._s3 = initS3();
  }

  async createCustomer(newCustomer: NewCustomer, createdBy: UserId) {
    const { name, surname, photo } = newCustomer;
    const dbCreatedResponse: QueryResult<{ id: CustomerId }> = await this._clientDb.query(`
      INSERT INTO ${customersDb}("name", "surname", "photo", "createdBy", "lastUpdatedBy")
      VALUES ('${name}', '${surname}', '${photo}', '${createdBy}', '${createdBy}')
      RETURNING id;
    `);
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customersDb}
      WHERE id=${dbCreatedResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  };
  async getCustomer(id: CustomerId) {
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customersDb}
      WHERE id=${id}
      ORDER BY id ASC
      limit 1;
    `);

    return dbResponse.rows[0];
  }

  async getCustomers() {
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customersDb}
      ORDER BY id ASC;
    `);
    return dbResponse.rows;
  };
  async updateCustomer(customer: Customer, updatedBy: UserId) {
    const { id, name, surname, photo, createdBy, isDeleted } = customer;
    const dbUpdateResponse: QueryResult<{ id: CustomerId }> = await this._clientDb.query(`
      UPDATE ${customersDb}
      SET id=${id}, name='${name}', surname='${surname}', photo='${photo}', "createdBy"=${createdBy}, "lastUpdatedBy"=${updatedBy}, "isDeleted"=${isDeleted}
      WHERE id=${id}
      RETURNING id;
    `);
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customersDb}
      WHERE id=${dbUpdateResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);
    return dbResponse.rows[0];
  };
  async deleteCustomer(id: CustomerId, updatedBy: UserId) {
    const dbCustomerResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customersDb}
      WHERE id=${id}
      ORDER BY id ASC
      limit 1;
    `);
    const { name, surname, photo, createdBy } = dbCustomerResponse.rows[0];
    const dbUpdateResponse: QueryResult<{ id: CustomerId }> = await this._clientDb.query(`
      UPDATE ${customersDb}
      SET id=${id}, name='${name}', surname='${surname}', photo='${photo}', "createdBy"=${createdBy}, "lastUpdatedBy"=${updatedBy}, "isDeleted"=true
      WHERE id=${id}
      RETURNING id;
    `);
    const dbResponse: QueryResult<Customer> = await this._clientDb.query(`
      SELECT * FROM ${customersDb}
      WHERE id=${dbUpdateResponse.rows[0].id}
      ORDER BY id ASC
      limit 1;
    `);
    return dbResponse.rows[0];
  };
  async uploadCustomerPhoto(photo: Express.Multer.File, customerId: CustomerId, updatedBy: number): Promise<Customer> {
    const customer = await this.getCustomer(customerId);
    const uploadParams: PutObjectRequest = { Bucket: process.env.AWS_BUCKET_NAME, Key: '', Body: '' };
    uploadParams.Body = createReadStream(photo.path);
    uploadParams.Key = `${photo.filename}.${photo.mimetype.split('/')[1]}`;
    uploadParams.ContentType = photo.mimetype;
    const data = await this._s3.upload(uploadParams).promise();
    customer.photo = data.Location;
    return customer;
  }
}