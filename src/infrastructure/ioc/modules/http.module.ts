import { Module } from "@nestjs/common";
import { HealthController } from "src/infrastructure/http/controllers/health.controller";
import { CustomerController } from "src/infrastructure/http/controllers/customer.controller";
import { AppServicesModule } from './appservices.module';
import { AuthModule } from "./auth.module";

const controllers = [
  HealthController,
  CustomerController,
];

@Module({
  imports: [AppServicesModule, AuthModule],
  controllers: [...controllers],
  providers: [],
})
export class HttpModule { }