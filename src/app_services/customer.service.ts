import { ForbiddenException, Inject } from "@nestjs/common";
import { NewCustomer, CustomerId, Customer } from "@src/domain-model/customer";
import { UserId } from "@src/domain-model/user";
import { CustomerRepository, CustomerRepositorySymbol } from "@src/domain-services/customer.repository";

export const CustomerServiceSymbol = Symbol.for('CustomerService');

export class CustomerService {
  constructor(
    @Inject(CustomerRepositorySymbol)
    private readonly customerRepository: CustomerRepository,
  ) { }

  async createCustomer(newCustomer: NewCustomer, createdBy: UserId) {
    return await this.customerRepository.createCustomer(newCustomer, createdBy);
  };

  async getCustomer(id: CustomerId) {
    return await this.customerRepository.getCustomer(id);
  };

  async getCustomers() {
    return await this.customerRepository.getCustomers();
  };

  async updateCustomer(customer: Customer, updatedBy: UserId) {
    if (!customer.photo.includes('amazonaws')) {
      throw new ForbiddenException("You can't change the customer photo using the update method. Please use the uploadPhoto method.");
    }
    return await this.customerRepository.updateCustomer(customer, updatedBy);
  };

  async deleteCustomer(id: CustomerId, updatedBy: UserId) {
    return await this.customerRepository.deleteCustomer(id, updatedBy);
  };

  async uploadCustomerPhoto(photo: Express.Multer.File, customerId: CustomerId, updatedBy: UserId) {
    return await this.customerRepository.uploadCustomerPhoto(photo, customerId, updatedBy);
  }
}