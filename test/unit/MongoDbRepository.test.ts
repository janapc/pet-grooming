import { Db } from 'mongodb';

import MongoDbRepository from '@infrastructure/repositories/MongoDbRepository';

const mockMongoDb: Db = {
  collection: jest.fn().mockReturnValue({
    insertOne: jest
      .fn()
      .mockRejectedValueOnce(new Error('Disconnected Database'))
      .mockResolvedValue({})
  })
} as unknown as Db;

test('Should try insert a new registry in database', async () => {
  const mongoDbRepository = new MongoDbRepository(mockMongoDb);
  await expect(async () => {
    await mongoDbRepository.insert(
      'asd123',
      100,
      '123.456.123-09',
      new Date('2022-09-12T13:00:00')
    );
  }).rejects.toThrowError('Disconnected Database');
});

test('Should insert a new registry in database', async () => {
  const mongoDbRepository = new MongoDbRepository(mockMongoDb);
  const insert = await mongoDbRepository.insert(
    'asd123',
    100,
    '123.456.123-09',
    new Date('2022-09-12T13:00:00')
  );
  expect(insert).toBeUndefined();
});
