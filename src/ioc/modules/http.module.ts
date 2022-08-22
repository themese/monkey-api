import { Module } from "@nestjs/common";
import { HealthController } from "src/infrastructure/http/controllers/health.controller";
import { CustomerController } from "src/infrastructure/http/controllers/customer.controller";
import { AppServicesModule } from './appservices.module';
import { AuthModule } from "./auth.module";
import { AuthController } from "src/infrastructure/http/controllers/auth.controller";
import { RoleController } from "src/infrastructure/http/controllers/role.controller";
import { UserController } from "src/infrastructure/http/controllers/user.controller";

const controllers = [
  HealthController,
  CustomerController,
  AuthController,
  RoleController,
  UserController,
];

@Module({
  imports: [AppServicesModule, AuthModule],
  controllers: [...controllers],
  providers: [],
})
export class HttpModule { }