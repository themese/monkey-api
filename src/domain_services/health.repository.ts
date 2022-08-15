export const HealthRepositorySymbol = Symbol.for('HealthRepository');

export interface HealthRepository {
  checkApi: () => string;
  checkDB: () => string;
}
