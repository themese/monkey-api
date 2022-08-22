import * as fs from 'fs';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExpressAdapter, FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { CustomerService, CustomerServiceSymbol } from "@src/app-services/customer.service";
import { NewCustomer, CustomerId, Customer } from "@src/domain-model/customer";
import { UserId } from "@src/domain-model/user";
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
  @ApiParam({
    name: 'requesterId',
    description: 'Requester user id',
    type: String,
  })
  @ApiBody({
    required: true,
    description: 'Customer to be added',
    type: NewCustomer,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/:requesterId')
  async createCustomer(
    @Param('requesterId') param: UserId,
    @Body('newCustomer') body: NewCustomer,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.createCustomer(body, param);
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
  @ApiResponse({
    status: 403,
    description: 'Forbidden. You can only change a customer\'s photo via upload photo method. Please use it or send the original photo URL in the Customer photo property'
  })
  @ApiResponse({
    status: 500,
    description: 'Something happend and we coudln\'t upload the photo'
  })
  @ApiParam({
    name: 'requesterId',
    description: 'Requester user id',
    type: String,
  })
  @ApiBody({
    required: true,
    description: 'Customer to be added',
    type: CustomerDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/:requesterId')
  async updateCustomer(
    @Param('requesterId') param: UserId,
    @Body('customer') body: Customer,
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.updateCustomer(body, param);
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
  @Delete('/:requesterId/:customerId')
  async deleteCustomer(
    @Param() params: { customerId: CustomerId, requesterId: UserId },
  ): Promise<CustomerDto> {
    try {
      const customer = await this.customerService.deleteCustomer(params.customerId, params.requesterId);
      return customerFromDomain(customer);
    } catch (err) {
      throw err;
    }
  }

  @ApiResponse({
    status: 201,
    description: "Uploads image to uor Cloud image repository and returns Customer",
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
    status: 500,
    description: 'Something happend and we coudln\'t upload the photo'
  })
  @ApiBody({
    description: 'Photo to be uploaded via multipart form-data'
  })
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