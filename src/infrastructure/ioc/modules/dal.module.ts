import { Module } from "@nestjs/common";
import { CustomerRepositorySymbol } from "src/domain_services/customer.repository";
import { HealthRepositorySymbol } from "src/domain_services/health.repository";
import { RoleRepositorySymbol } from "src/domain_services/role.repository";
import { CustomerRepositoryImpl } from "src/infrastructure/dal/customer.repository_impl";
import { HealthRepositoryImpl } from "src/infrastructure/dal/health.repository_impl";
import { RoleRepositoryImpl } from "src/infrastructure/dal/role.repository_impl";

@Module({
  providers: [
    {
      provide: HealthRepositorySymbol,
      useClass: HealthRepositoryImpl,
    },
    {
      provide: CustomerRepositorySymbol,
      useClass: CustomerRepositoryImpl,
    },
    {
      provide: RoleRepositorySymbol,
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [
    HealthRepositorySymbol,
    CustomerRepositorySymbol,
    RoleRepositorySymbol,
  ],
})
export class DataAccessLayerModule { };