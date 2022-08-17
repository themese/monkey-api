import { Module } from "@nestjs/common";
import { HealthController } from "src/infrastructure/http/controllers/health.controller";
import { AppServicesModule } from './appservices.module';
import { AuthModule } from "./auth.module";

const publicControllers = [HealthController];
const privateControllers = [];

@Module({
  imports: [AppServicesModule, AuthModule],
  controllers: [...privateControllers, ...publicControllers],
  providers: [],
})
export class HttpModule { }