import MongoDbConnection from '@infrastructure/databases/MongoDbConnection';

jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValueOnce({}),
    db: jest.fn().mockReturnValue({
      collection: jest.fn()
    })
  }))
}));

test('Should connect with database', async () => {
  const mongoDbConnection = await MongoDbConnection.getInstance();
  expect(mongoDbConnection).not.toBeNull();
  expect(mongoDbConnection.collection).toBeTruthy();
});
