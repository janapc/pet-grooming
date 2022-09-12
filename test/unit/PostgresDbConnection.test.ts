import PostgresDbConnection from '@infrastructure/databases/PostgresDbConnection';

jest.mock('postgres', () => {
  return jest.fn().mockReturnValue(() => {});
});

test('Should connect with database', async () => {
  const postgresDbConnection = await PostgresDbConnection.getInstance();
  expect(postgresDbConnection).not.toBeNull();
});
