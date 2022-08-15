import { Module } from "@nestjs/common";
import { HealthController } from "src/infrastructure/http/controllers/health.controller";
import { AppServicesModule } from './appservices.module';

const publicControllers = [HealthController];
const privateControllers = [];

@Module({
  imports: [AppServicesModule],
  controllers: [...privateControllers, ...publicControllers],
  providers: [],
})
export class HttpModule { }