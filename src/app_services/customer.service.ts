import { Inject } from "@nestjs/common";
import { NewCustomer, CustomerId, Customer } from "src/domain_model/customer";
import { CustomerRepository, CustomerRepositorySymbol } from "src/domain_services/customer.repository";

export const CustomerServiceSymbol = Symbol.for('CustomerService');

export class CustomerService {
  constructor(
    @Inject(CustomerRepositorySymbol)
    private readonly customerRepository: CustomerRepository,
  ) { }

  async createCustomer(newCustomer: NewCustomer) {
    return await this.customerRepository.createCustomer(newCustomer, 1);
  };

  async getCustomer(id: CustomerId) {
    return await this.customerRepository.getCustomer(id);
  };

  async getCustomers() {
    return await this.customerRepository.getCustomers();
  };

  async updateCustomer(customer: Customer) {
    return await this.customerRepository.updateCustomer(customer, 1);
  };

  async deleteCustomer(id: CustomerId) {
    return await this.customerRepository.deleteCustomer(id, 1);
  };
}