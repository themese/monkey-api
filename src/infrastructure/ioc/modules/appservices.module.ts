import { Module } from "@nestjs/common";
import { CustomerServiceSymbol, CustomerService } from "src/app_services/customer.service";
import { HealthService, HealthServiceSymbol } from "src/app_services/health.service";
import { DataAccessLayerModule } from "./dal.module";

@Module({
  imports: [DataAccessLayerModule],
  providers: [
    {
      provide: HealthServiceSymbol,
      useClass: HealthService,
    },
    {
      provide: CustomerServiceSymbol,
      useClass: CustomerService,
    },
  ],
  exports: [
    HealthServiceSymbol,
    CustomerServiceSymbol,
  ]
})
export class AppServicesModule { }