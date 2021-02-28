import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: "Survey Test",
      description: "Survey test description."
    });

    expect(response.status).toEqual(201);
  });

  it('Should not be able to create a new survey if title already exists', async () => {
    const response = await request(app).post('/surveys').send({
      title: "Survey Test",
      description: "Survey test description."
    });

    expect(response.status).toEqual(400);
  });

  it('Should be able to list all surveys', async () => {
    const response = await request(app).get('/surveys').send();

    expect(response.status).toEqual(200);
  });

  it('Should be able to list a survey by title', async () => {
    const response = await request(app).get('/surveys').send({
      title: "Survey Test"
    })

    expect(response.status).toEqual(200);
  });

  it('Should not be able to list an survey by non-existent title', async () => {
    const response = await request(app).get('/surveys').send({
      title: "Non Existent Title"
    })

    expect(response.status).toEqual(400);
  });

  // it('Should be able to update an existing survey', async () => {});
  // it('Should not be able to update a non-existent survey', async () => {});

  // it('Should be able to delete an existing survey', async () => {});
  // it('Should not be able to delete a non-existent survey', async () => {});

});