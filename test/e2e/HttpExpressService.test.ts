import request from 'supertest';

import MongoDbRepository from '@infrastructure/repositories/MongoDbRepository';
import { app, server } from '@infrastructure/http/express/index';

jest.mock('@infrastructure/databases/MongoDbConnection');
jest.mock('@infrastructure/repositories/MongoDbRepository');

afterEach(() => {
  server.close();
  jest.restoreAllMocks();
});

test('Should create a new order of service and return response to json', async () => {
  jest.spyOn(MongoDbRepository.prototype, 'insert').mockResolvedValue();
  const response = await request(app)
    .post('/service')
    .set('Accept', 'application/json')
    .send({
      id: 'asd123',
      typeService: 'CUT',
      sizePet: 'SMALL',
      cpf: '123.456.123-90',
      date: '2022-09-09T13:00:00'
    });
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/json/);
  expect(response.body).toEqual({
    serviceId: 'asd123-1662739200000-00001',
    total: 52.5
  });
});

test('Should create a new order of service and return response to xml', async () => {
  jest.spyOn(MongoDbRepository.prototype, 'insert').mockResolvedValue();
  const textXml = `<services><serviceId>asd123-1662739200000-00001</serviceId><total>52.5</total></services>`;
  const response = await request(app)
    .post('/service')
    .set('Accept', 'application/xml')
    .send({
      id: 'asd123',
      typeService: 'CUT',
      sizePet: 'SMALL',
      cpf: '123.456.123-90',
      date: '2022-09-09T13:00:00'
    });
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toEqual(
    'application/xml; charset=utf-8'
  );
  expect(response.text).toEqual(textXml);
});

test('Should try create a new order of service without type of service', async () => {
  const response = await request(app).post('/service').send({
    id: 'asd123',
    sizePet: 'SMALL',
    cpf: '123.456.123-90',
    date: '2022-09-09T13:00:00'
  });
  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    error: "Cannot read properties of undefined (reading 'SMALL')"
  });
});

test('Should try create a new order of service', async () => {
  jest.spyOn(MongoDbRepository.prototype, 'insert').mockRejectedValue(true);
  const response = await request(app).post('/service').send({
    id: 'asd123',
    typeService: 'CUT',
    sizePet: 'SMALL',
    cpf: '123.456.123-90',
    date: '2022-09-09T13:00:00'
  });
  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    error: 'Error internal'
  });
});
