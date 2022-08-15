import { Module } from "@nestjs/common";
import { HealthRepositorySymbol } from "src/domain_services/health.repository";
import { HealthRepositoryImpl } from "src/infrastructure/dal/health.repository_impl";

@Module({
  providers: [{
    provide: HealthRepositorySymbol,
    useClass: HealthRepositoryImpl,
  }],
  exports: [
    HealthRepositorySymbol,
  ],
})
export class DataAccessLayerModule { };