import 'reflect-metadata';
import './database';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/users', (request, response) => {
  return response.json({ message: "GET: Hello World!" });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});