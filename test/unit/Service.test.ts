import Service from '@domain/entities/Service';

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-05T13:00:00.135Z'));
});

afterEach(() => {
  jest.clearAllTimers();
});

test('Should create a new service with cpf valid', () => {
  const date = new Date();
  const service = new Service(
    'asd123',
    'CUT',
    'MEDIUM',
    '128.192.183-29',
    date
  );
  expect(service.getTotal()).toEqual(84);
});

test('Should try create a new service with cpf invalid', () => {
  const date = new Date();
  expect(
    () => new Service('asd123', 'CUT', 'MEDIUM', '128.192.183292', date)
  ).toThrowError('Invalid cpf');
});

test('Should try create a new service with day Sunday', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-04T13:00:00.135Z'));
  const date = new Date();
  expect(
    () => new Service('asd123', 'CUT', 'MEDIUM', '12834598760', date)
  ).toThrowError('The service is unavailable today');
});

test('Should try create a new service with day Saturday', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-03T13:00:00.135Z'));
  const date = new Date();
  expect(
    () => new Service('asd123', 'CUT', 'MEDIUM', '12834598760', date)
  ).toThrowError('The service is unavailable today');
});

test('Should create a new service with day valid', () => {
  const date = new Date();
  const service = new Service('asd123', 'CUT', 'MEDIUM', '12834598760', date);
  expect(service.getTotal()).toEqual(84);
});

test('Should try create a new service with hour after 18 hours', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-07T18:00:00.135Z'));
  const date = new Date();
  expect(
    () => new Service('asd123', 'CUT', 'MEDIUM', '12834598760', date)
  ).toThrowError('Out of Hour of attendance');
});

test('Should try create a new service with hour before 08 hours', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-07T08:00:00.135Z'));
  const date = new Date();
  expect(
    () => new Service('asd123', 'CUT', 'MEDIUM', '12834598760', date)
  ).toThrowError('Out of Hour of attendance');
});

test('Should create a new service with hour available', () => {
  const date = new Date();
  const service = new Service('asd123', 'CUT', 'MEDIUM', '12834598760', date);
  expect(service.getTotal()).toEqual(84);
});

test('Should create a new service calculating the total to cut hair and size pet is medium', () => {
  const date = new Date();
  const service = new Service('asd123', 'CUT', 'MEDIUM', '12834598760', date);
  expect(service.getTotal()).toEqual(84);
});

test('Should create a new service calculating the total to cut hair and size pet is small', () => {
  const date = new Date();
  const service = new Service('asd123', 'CUT', 'SMALL', '12834598760', date);
  expect(service.getTotal()).toEqual(52.5);
});

test('Should create a new service calculating the total to cut hair and size pet is big', () => {
  const date = new Date();
  const service = new Service('asd123', 'CUT', 'BIG', '12834598760', date);
  expect(service.getTotal()).toEqual(105);
});

test('Should create a new service calculating the total to bath and size pet is medium', () => {
  const date = new Date();
  const service = new Service('asd123', 'BATH', 'MEDIUM', '12834598760', date);
  expect(service.getTotal()).toEqual(63);
});

test('Should create a new service calculating the total to bath and size pet is small', () => {
  const date = new Date('2022-09-07T13:00:00Z');
  const service = new Service('asd123', 'BATH', 'SMALL', '12834598760', date);
  expect(service.getTotal()).toEqual(42);
});

test('Should create a new service calculating the total to bath and size pet is big', () => {
  const date = new Date('2022-09-07T13:00:00Z');
  const service = new Service('asd123', 'BATH', 'BIG', '12834598760', date);
  expect(service.getTotal()).toEqual(84);
});

test('Should create a new service and get serviceId', () => {
  const date = new Date('2022-09-07T13:00:00Z');
  const service = new Service('asd123', 'BATH', 'BIG', '12834598760', date);
  expect(service.serviceId).toEqual('asd123-1662555600000-00001');
});
