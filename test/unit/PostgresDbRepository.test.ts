import { Sql } from 'postgres';

import PostgresDbRepository from '@infrastructure/repositories/PostgresDbRepository';

const mockPostgresDb: Sql<{}> = jest
  .fn()
  .mockRejectedValueOnce(new Error('Disconnected Database'))
  .mockResolvedValue({}) as unknown as Sql<{}>;

test('Should try insert a new registry in database', async () => {
  const postgresDbRepository = new PostgresDbRepository(mockPostgresDb);
  await expect(async () => {
    await postgresDbRepository.insert(
      'asd123',
      100,
      '123.456.123-09',
      new Date('2022-09-12T13:00:00')
    );
  }).rejects.toThrowError('Disconnected Database');
});

test('Should try insert a new registry in database', async () => {
  const postgresDbRepository = new PostgresDbRepository(mockPostgresDb);
  const insert = await postgresDbRepository.insert(
    'asd123',
    100,
    '123.456.123-09',
    new Date('2022-09-12T13:00:00')
  );
  expect(insert).toBeUndefined();
});
