import { HealthRepository } from "@src/domain-services/health.repository";

export class HealthRepositoryImpl implements HealthRepository {
  checkApi() {
    return 'You are able to connect to the api. No queries to the DB were done';
  }

  checkDB() {
    return 'You are able to connect to the DB. Current DB time is: ';
  }

  checkAuth() {
    return 'You have been authorized successfully'
  };
}