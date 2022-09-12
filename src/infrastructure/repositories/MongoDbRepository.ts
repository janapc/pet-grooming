import mongodb from 'mongodb';

import ServiceRepository from '@domain/repositories/ServiceRepository';

export default class MongoDbRepository implements ServiceRepository {
  constructor(private readonly database: mongodb.Db) {}

  async insert(
    serviceId: string,
    total: number,
    cpf: string,
    date: Date
  ): Promise<void> {
    await this.database
      .collection('services')
      .insertOne({ serviceId, total, cpf, date });
  }
}
