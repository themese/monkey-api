import { Controller, Get, Inject } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HealthService, HealthServiceSymbol } from "src/app_services/health.service";

@ApiTags('Health')
@Controller('/api/health')
export class HealthController {
  constructor(
    @Inject(HealthServiceSymbol)
    private readonly healthService: HealthService,
  ) { }

  @ApiResponse({
    status: 200,
    description: 'Check basic api.',
    type: Object
  })
  @Get('/')
  async check() {
    return { response: 'hello!!' };
  }
  @ApiResponse({
    status: 200,
    description: 'Checks full api connection and resources. No auth required',
    type: Object
  })
  @Get('/api')
  checkApi(): string {
    return this.healthService.checkApi();
  }
}
