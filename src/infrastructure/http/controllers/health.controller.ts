import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HealthService, HealthServiceSymbol } from "@src/app-services/health.service";

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

  @ApiResponse({
    status: 200,
    description: 'Checks auth connection and returns dummy text',
    type: String
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access. Credentials sent failed'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/auth')
  checkAuth(): string {
    return this.healthService.checkAuth();
  }
}
