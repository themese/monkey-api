import { Module } from "@nestjs/common";
import { HealthController } from "src/infrastructure/http/controllers/health.controller";
import { CustomerController } from "src/infrastructure/http/controllers/customer.controller";
import { AppServicesModule } from './appservices.module';
import { AuthModule } from "./auth.module";
import { AuthController } from "src/infrastructure/http/controllers/auth.controller";

const controllers = [
  HealthController,
  CustomerController,
  AuthController,
];

@Module({
  imports: [AppServicesModule, AuthModule],
  controllers: [...controllers],
  providers: [],
})
export class HttpModule { }