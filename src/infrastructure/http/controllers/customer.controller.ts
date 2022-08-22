import * as fs from 'fs';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { CustomerService, CustomerServiceSymbol } from "src/app_services/customer.service";
import { NewCustomer, CustomerId, Customer } from "src/domain_model/customer";
import { UserId } from "src/domain_model/user";
import { CustomerDto } from "../dtos/customer.dto";
import { customerFromDomain } from "../dto_mappers/customer.mapper";
import * as path from 'path';

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
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createCustomer(
    @Body('newCustomer') body: NewCustomer,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.createCustomer(body);
      return customerFromDomain(customer);
    } catch (err) {
      throw err;
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
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getCustomers(): Promise<CustomerDto[]> {
    try {
      const customers = await this.customerService.getCustomers();
      return customers.map(customerFromDomain);
    } catch (err) {
      throw err;
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
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getCustomer(
    @Param('id') param: CustomerId,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.getCustomer(param);
      return customerFromDomain(customer);
    } catch (err) {
      throw err;
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
    description: 'Customer was not found'
  })
  @ApiResponse({
    status: 400,
    description: 'Error updating the customer'
  })
  @ApiBody({
    required: true,
    description: 'Customer to be added',
    type: CustomerDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/')
  async updateCustomer(
    @Body('customer') body: Customer,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.updateCustomer(body);
      return customerFromDomain(customer);
    } catch (err) {
      throw err;
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Soft deletes customer given its id. It returns the customer that was soft deleted',
    type: CustomerDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Customer was not found'
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
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteCustomer(
    @Param('id') param: CustomerId,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.deleteCustomer(param);
      return customerFromDomain(customer);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: 'tmp/',
    }),
  }))
  @Post('/:requesterId/:customerId/uploadPhoto')
  async uploadPhoto(
    @Param() params: { requesterId: UserId, customerId: CustomerId },
    @UploadedFile() photo: Express.Multer.File,
  ) {
    try {
      const customer = await this.customerService.uploadCustomerPhoto(photo, params.customerId, params.requesterId);
      return customerFromDomain(customer);
    } catch (err) {
      throw err;
    }
    finally {
      fs.rmdir(
        path.join(__dirname, `../../../../tmp/`),
        () => {
          console.log('Tmp folder was successfully removed');
        },
      );
    }
  }
}