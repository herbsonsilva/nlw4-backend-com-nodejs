import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {

  async show(request: Request, response: Response) {

    const { email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    if (email) {

      // SELECT * FROM users WHERE email = 'email';
      const user = await usersRepository.findOne({
        email
      });

      if (!user) {
        return response.status(400).json({
          error: "User does not exists!"
        });
      };

      return response.status(200).json(user);
    }

    // SELECT * FROM users;
    const users = await usersRepository.find();

    return response.status(200).json(users);
  };

  async create(request: Request, response: Response) {

    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    // SELECT * FROM users WHERE email = 'email';
    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      return response.status(400).json({
        error: 'User already exists!'
      });
    };

    // INSERT INTO users (column, column) VALUES ('value', 'value')
    const user = await usersRepository.create({
      name,
      email
    });

    await usersRepository.save(user);

    response.status(201).json(user);
  };

  async update(request: Request, response: Response) {

    const { id, name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    // SELECT * FROM users WHERE id = 'id';
    let user = await usersRepository.findOne({
      id
    });

    if (!user) {
      return response.status(400).json({
        error: 'User does not exists!'
      });
    };

    // UPDATE surveys SET column = 'value', ..., updated_at = CURRENT_TIMESTAMP WHERE id = 'id'
    await usersRepository.update(
      {
        id
      },
      {
        name,
        email
      }
    );

    user = await usersRepository.findOne({
      id
    });

    response.status(202).json(user);
  };

  async delete(request: Request, response: Response) {

    const { id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    // SELECT * FROM users WHERE id = 'id';
    const user = await usersRepository.findOne({
      id
    });

    if (!user) {
      return response.status(400).json({
        error: 'User does not exists!'
      });
    };

    // DELETE FROM users WHERE id = 'id'
    await usersRepository.delete({
      id
    });

    response.status(204).json();
  };

};

export { UserController };
