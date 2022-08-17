import { Inject } from "@nestjs/common";
import { HealthRepository, HealthRepositorySymbol } from "src/domain_services/health.repository";

export const HealthServiceSymbol = Symbol.for('HealthService');

export class HealthService {
  constructor(
    @Inject(HealthRepositorySymbol)
    private readonly healthRepository: HealthRepository,
  ) { }

  checkApi() {
    return this.healthRepository.checkApi();
  }

  checkDb() {
    return this.healthRepository.checkDB();
  }

  checkAuth() {
    return this.healthRepository.checkAuth();
  }
}