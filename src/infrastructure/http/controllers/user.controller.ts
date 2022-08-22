import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService, UserServiceSymbol } from "@src/app-services/user.service";
import { NewUser, User, UserId } from "@src/domain-model/user";
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
  @ApiResponse({
    status: 406,
    description: 'Invalid role. Only an admin can create a user'
  })
  @ApiParam({
    name: 'requesterId',
    description: 'Requester user id',
    type: String,
  })
  @ApiBody({
    required: true,
    description: 'User to be added ',
    type: NewUser,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/:requesterId')
  async createUser(
    @Param('requesterId') param: UserId,
    @Body('newUser') body: NewUser,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.createUser(body, param);
      return userFromDomain(user);
    } catch (err) {
      throw err;
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
  @ApiResponse({
    status: 406,
    description: 'Invalid role. Only an admin can create a user'
  })
  @ApiParam({
    name: 'requesterId',
    description: 'Requester user id',
    type: String,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:requesterId')
  async getUsers(
    @Param('requesterId') param: UserId,
  ): Promise<UserDto[]> {
    try {
      const users = await this.userService.getUsers(param);
      return users.map(userFromDomain);
    } catch (err) {
      throw err;
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
  @ApiResponse({
    status: 406,
    description: 'Invalid role. Only an admin can create a user'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the user'
  })
  @ApiParam({
    name: 'requesterId',
    description: 'Requester user id',
    type: String,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId/:requesterId')
  async getUser(
    @Param() params: { userId: UserId, requesterId: UserId },
  ) {
    try {
      const user = await this.userService.getUser(params.userId, params.requesterId);
      return userFromDomain(user);
    } catch (err) {
      throw err;
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns updated user',
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
    description: 'Error updating the user'
  })
  @ApiResponse({
    status: 406,
    description: 'Invalid role. Only an admin can create a user'
  })
  @ApiParam({
    name: 'requesterId',
    description: 'Requester user id',
    type: String,
  })
  @ApiBody({
    required: true,
    description: 'User to be added',
    type: User,
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/:requesterId')
  async updateUser(
    @Param('requesterId') param: UserId,
    @Body('user') body: User,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.updateUser(body, param);
      return userFromDomain(user);
    } catch (err) {
      throw err;
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
  @ApiResponse({
    status: 406,
    description: 'Invalid role. Only an admin can create a user'
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the User',
    required: true,
  })
  @ApiParam({
    name: 'requesterId',
    description: 'Requester user id',
    type: String,
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:userId/:requesterId')
  async deleteUser(
    @Param() params: { userId: UserId, requesterId: UserId },
  ): Promise<UserDto> {
    try {
      const user = await this.userService.deleteUser(params.userId, params.requesterId);
      return userFromDomain(user);
    } catch (err) {
      throw err;
    }
  }

}