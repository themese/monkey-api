import { Module } from "@nestjs/common";
import { CustomerRepositorySymbol } from "src/domain_services/customer.repository";
import { HealthRepositorySymbol } from "src/domain_services/health.repository";
import { CustomerRepositoryImpl } from "src/infrastructure/dal/customer.repository_impl";
import { HealthRepositoryImpl } from "src/infrastructure/dal/health.repository_impl";

@Module({
  providers: [
    {
      provide: HealthRepositorySymbol,
      useClass: HealthRepositoryImpl,
    },
    {
      provide: CustomerRepositorySymbol,
      useClass: CustomerRepositoryImpl,
    }
  ],
  exports: [
    HealthRepositorySymbol,
    CustomerRepositorySymbol,
  ],
})
export class DataAccessLayerModule { };