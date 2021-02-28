import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: "User Test",
      email: "user@test.com"
    });

    expect(response.status).toEqual(201);
  });

  it('Should not be able to create a new user if email already exists', async () => {
    const response = await request(app).post('/users').send({
      name: "User Test",
      email: "user@test.com"
    });

    expect(response.status).toEqual(400);
  });

  it('Should be able to list all users', async () => {
    const response = await request(app).get('/users').send();

    expect(response.status).toEqual(200);
  });

  it('Should be able to list a user by email', async () => {
    const response = await request(app).get('/users').send({
      email: "user@test.com"
    })

    expect(response.status).toEqual(200);
  });

  it('Should not be able to list an user by non-existent email', async () => {
    const response = await request(app).get('/users').send({
      email: "non-existent-email@test.com"
    })

    expect(response.status).toEqual(400);
  });

  // it('Should be able to update an existing user', async () => {});
  // it('Should not be able to update a non-existent user', async () => {});

  // it('Should be able to delete an existing user', async () => {});
  // it('Should not be able to delete a non-existent user', async () => {});

});