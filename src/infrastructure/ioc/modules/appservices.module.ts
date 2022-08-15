import { Module } from "@nestjs/common";
import { HealthService, HealthServiceSymbol } from "src/app_services/health.service";
import { DataAccessLayerModule } from "./dal.module";

@Module({
  imports: [DataAccessLayerModule],
  providers: [{
    provide: HealthServiceSymbol,
    useClass: HealthService,
  }],
  exports: [
    HealthServiceSymbol,
  ]
})
export class AppServicesModule { }