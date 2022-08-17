import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomerService, CustomerServiceSymbol } from "src/app_services/customer.service";
import { NewCustomer, CustomerId, Customer } from "src/domain_model/customer";
import { CustomerDto } from "../dtos/customer.dto";
import { customerFromDomain } from "../dto_mappers/customer.mapper";

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('/api/customers')
export class CustomerController {
  constructor(
    @Inject(CustomerServiceSymbol)
    private readonly customerService: CustomerService,
  ) { }

  @ApiResponse({
    status: 201,
    description: 'Creates user and returns it',
    type: CustomerDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 400,
    description: 'Error creating the customer'
  })
  @ApiBody({
    required: true,
    description: 'Customer to be added',
    type: NewCustomer,
  })
  @Post('/')
  async createCustomer(
    @Body('newCustomer') body: NewCustomer,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.createCustomer(body);
      return customerFromDomain(customer);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all customers from DB'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Get('/')
  async getCustomers(): Promise<CustomerDto[]> {
    try {
      const customers = await this.customerService.getCustomers();
      return customers.map(customerFromDomain);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns customer given its Id'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'No customer was found given that id'
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the Customer',
    required: true,
  })
  @Get('/:id')
  async getCustomer(
    @Param('id') param: CustomerId,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.getCustomer(param);
      return customerFromDomain(customer);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns updated customer'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'No customer was found given that id'
  })
  @ApiResponse({
    status: 400,
    description: 'Error updating the customer'
  })
  @ApiBody({
    required: true,
    description: 'Customer to be added',
    type: Customer,
  })
  @Put('/')
  async updateCustomer(
    @Body('customer') body: Customer,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.updateCustomer(body);
      return customerFromDomain(customer);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Deletes customer given its id'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'No customer was found given that id'
  })
  @ApiResponse({
    status: 400,
    description: 'Error deleting the customer'
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the Customer',
    required: true,
  })
  @Delete('/:id')
  async deleteCustomer(
    @Param('id') param: CustomerId,
  ): Promise<void> {
    try {
      await this.customerService.deleteCustomer(param);
    } catch (err) {
      throw new Error(err);
    }
  }
}