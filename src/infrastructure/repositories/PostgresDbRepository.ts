import postgres from 'postgres';

import ServiceRepository from '@domain/repositories/ServiceRepository';

export default class PostgresDbRepository implements ServiceRepository {
  constructor(private readonly database: postgres.Sql<{}>) {}

  async insert(
    serviceId: string,
    total: number,
    cpf: string,
    date: Date
  ): Promise<void> {
    await this.database`
    insert into services
      (serviceId, total, cpf, date)
    values
      (${serviceId}, ${total}, ${cpf}, ${date})
  `;
  }
}
