import { Customer, CustomerId, NewCustomer } from "src/domain_model/customer";

export const CustomerRepositorySymbol = Symbol.for('CustomerRepository');

export interface CustomerRepository {
  createCustomer: (newCustomer: NewCustomer) => Promise<Customer>;
  getCustomer: (id: CustomerId) => Promise<Customer>;
  getCustomers: () => Promise<Customer[]>;
  updateCustomer: (customer: Customer) => Promise<Customer>;
  deleteCustomer: (id: CustomerId) => void;
}