import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService, UserServiceSymbol } from "src/app_services/user.service";
import { NewUser, User, UserId } from "src/domain_model/user";
import { UserDto } from "../dtos/user.dto";
import { userFromDomain } from "../dto_mappers/user.mapper";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/api/users')
export class UserController {
  constructor(
    @Inject(UserServiceSymbol)
    private readonly userService: UserService,
  ) { }

  @ApiResponse({
    status: 201,
    description: 'Creates a user and returns it',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error creating the user'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiBody({
    required: true,
    description: 'User to be added',
    type: NewUser,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createUser(
    @Body('newUser') body: NewUser,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.createUser(body);
      return userFromDomain(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    type: [UserDto]
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getUsers(): Promise<UserDto[]> {
    try {
      const users = await this.userService.getUsers();
      return users.map(userFromDomain);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns user based of its id',
    type: UserDto
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the user'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getUser(
    @Param('id') param: UserId,
  ) {
    try {
      const user = await this.userService.getUser(param);
      return userFromDomain(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns updated user'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'User was not found'
  })
  @ApiResponse({
    status: 400,
    description: 'Error updating the user'
  })
  @ApiBody({
    required: true,
    description: 'User to be added',
    type: UserDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/')
  async updateUser(
    @Body('user') body: User,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.updateUser(body);
      return userFromDomain(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Soft deletes user given its id and retuns it',
    type: UserDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'User was not found'
  })
  @ApiResponse({
    status: 400,
    description: 'Error deleting the User'
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the User',
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteUser(
    @Param('id') param: UserId,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.deleteUser(param);
      return userFromDomain(user);
    } catch (err) {
      throw new Error(err);
    }
  }

}