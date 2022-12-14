import { Module } from "@nestjs/common";
import { CustomerServiceSymbol, CustomerService } from "@src/app-services/customer.service";
import { HealthService, HealthServiceSymbol } from "@src/app-services/health.service";
import { RoleService, RoleServiceSymbol } from "@src/app-services/role.service";
import { UserService, UserServiceSymbol } from "@src/app-services/user.service";
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
    {
      provide: RoleServiceSymbol,
      useClass: RoleService,
    },
    {
      provide: UserServiceSymbol,
      useClass: UserService,
    },
  ],
  exports: [
    HealthServiceSymbol,
    CustomerServiceSymbol,
    RoleServiceSymbol,
    UserServiceSymbol,
  ]
})
export class AppServicesModule { }