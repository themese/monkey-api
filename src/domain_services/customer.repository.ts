import { Customer, CustomerId, NewCustomer } from "@src/domain-model/customer";
import { UserId } from "@src/domain-model/user";

export const CustomerRepositorySymbol = Symbol.for('CustomerRepository');

export interface CustomerRepository {
  createCustomer: (newCustomer: NewCustomer, createdBy: UserId) => Promise<Customer>;
  getCustomer: (id: CustomerId) => Promise<Customer>;
  getCustomers: () => Promise<Customer[]>;
  updateCustomer: (customer: Customer, updatedBy: UserId) => Promise<Customer>;
  deleteCustomer: (id: CustomerId, updatedBy: UserId) => Promise<Customer>;
  uploadCustomerPhoto: (photo: Express.Multer.File, customerId: CustomerId, updatedBy: UserId) => Promise<Customer>;
}