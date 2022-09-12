import { Db } from 'mongodb';

import MongoDbRepository from '@infrastructure/repositories/MongoDbRepository';
import ServiceOrder from '@application/useCases/ServiceOrder/ServiceOrder';
import ServiceOrderInputDto from '@application/useCases/ServiceOrder/ServiceOrderInputDto';

const mockMongoDbConnection: Db = {
  collection: jest.fn().mockReturnValue({
    insertOne: jest
      .fn()
      .mockRejectedValueOnce(new Error('Disconnected Database'))
      .mockResolvedValue({})
  })
} as unknown as Db;

test('Should not create a new order of service if the database stay disconnected', async () => {
  const repository = new MongoDbRepository(mockMongoDbConnection);
  const serviceOrder = new ServiceOrder(repository);
  const input: ServiceOrderInputDto = {
    id: 'asd123',
    typeService: 'CUT',
    sizePet: 'SMALL',
    cpf: '123.456.234-90',
    date: new Date('2022-09-07T13:00:00')
  };
  await expect(async () => await serviceOrder.execute(input)).rejects.toThrow(
    'Disconnected Database'
  );
});

test('Should create a new order of service', async () => {
  const repository = new MongoDbRepository(mockMongoDbConnection);
  const serviceOrder = new ServiceOrder(repository);
  const input: ServiceOrderInputDto = {
    id: 'asd123',
    typeService: 'CUT',
    sizePet: 'SMALL',
    cpf: '123.456.234-90',
    date: new Date('2022-09-07T13:00:00')
  };
  const output = await serviceOrder.execute(input);
  expect(output).toEqual({
    serviceId: 'asd123-1662566400000-00001',
    total: 52.5
  });
});

test('Should try create a new order of service with an invalid date', async () => {
  const repository = new MongoDbRepository(mockMongoDbConnection);
  const serviceOrder = new ServiceOrder(repository);
  const input: ServiceOrderInputDto = {
    id: 'asd123',
    typeService: 'CUT',
    sizePet: 'SMALL',
    cpf: '123.456.234-90',
    date: new Date('2022-09-04T13:00:00')
  };
  await expect(async () => await serviceOrder.execute(input)).rejects.toThrow(
    'The service is unavailable today'
  );
});
