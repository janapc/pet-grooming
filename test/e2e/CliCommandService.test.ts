import CommandService from '@infrastructure/cli/commands/CommandService';

jest.mock('@infrastructure/databases/PostgresDbConnection', () => {
  return { getInstance: jest.fn().mockResolvedValue(true) };
});
jest.mock('@infrastructure/repositories/PostgresDbRepository', () => {
  return jest
    .fn()
    .mockImplementation(() => ({ insert: jest.fn().mockResolvedValue(true) }));
});

test('Should create a new service of order', async () => {
  process.argv = [
    'id=asd123',
    'typeService=BATH',
    'sizePet=BIG',
    'cpf=568.123.456-19',
    'date=2022-09-12T13:00:00'
  ];
  const commandService = new CommandService();
  const output = await commandService.build();
  expect(output).toEqual({
    serviceId: 'asd123-1662998400000-00001',
    total: 84
  });
});

test('Should try create a new order of service without type of service', async () => {
  process.argv = [
    'id=asd123',
    'sizePet=BIG',
    'cpf=568.123.456-19',
    'date=2022-09-12T13:00:00'
  ];
  const commandService = new CommandService();
  await expect(async () => {
    await commandService.build();
  }).rejects.toThrowError(
    "Cannot read properties of undefined (reading 'BIG')"
  );
});
