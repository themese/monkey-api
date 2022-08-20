import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleService, RoleServiceSymbol } from "src/app_services/role.service";
import { NewRole, Role, RoleId } from "src/domain_model/role";
import { RoleDto } from "../dtos/role.dto";
import { roleFromDomain } from "../dto_mappers/role.mapper";

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('/api/roles')
export class RoleController {
  constructor(
    @Inject(RoleServiceSymbol)
    private readonly roleService: RoleService,
  ) { }

  @ApiResponse({
    status: 201,
    description: 'Creates a role and returns it',
    type: RoleDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error creating the customer'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiBody({
    required: true,
    description: 'Role to be added',
    type: NewRole,
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createRole(
    @Body('newRole') body: NewRole,
  ): Promise<RoleDto> {
    try {
      const role = await this.roleService.createRole(body);
      return roleFromDomain(role);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all roles',
    type: [RoleDto]
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async getRoles(): Promise<RoleDto[]> {
    try {
      const roles = await this.roleService.getRoles();
      return roles.map(roleFromDomain);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns role based of its id',
    type: RoleDto
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the role'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getRole(
    @Param('id') param: RoleId,
  ) {
    try {
      const role = await this.roleService.getRole(param);
      return roleFromDomain(role);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Returns updated role'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Role was not found'
  })
  @ApiResponse({
    status: 400,
    description: 'Error updating the role'
  })
  @ApiBody({
    required: true,
    description: 'role to be added',
    type: RoleDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/')
  async updateRole(
    @Body('role') body: Role,
  ): Promise<RoleDto> {
    try {
      const role = await this.roleService.updateRole(body);
      return roleFromDomain(role);
    } catch (err) {
      throw new Error(err);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Hard deletes role given its id',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Role was not found'
  })
  @ApiResponse({
    status: 400,
    description: 'Error deleting the role'
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id of the Role',
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteRole(
    @Param('id') param: RoleId,
  ): Promise<void> {
    try {
      await this.roleService.deleteRole(param);
    } catch (err) {
      throw new Error(err);
    }
  }

}