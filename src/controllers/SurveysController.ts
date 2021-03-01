import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {

  async show(request: Request, response: Response) {

    const { title } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    if (title) {

      // SELECT * FROM surveys WHERE title = 'title';
      const survey = await surveysRepository.findOne({
        title
      });

      if (!survey) {
        return response.status(400).json({
          error: "Survey does not exists!"
        });
      }

      return response.status(200).json(survey);
    };

    // SELECT * FROM users;
    const surveys = await surveysRepository.find();

    return response.status(200).json(surveys);
  };

  async create(request: Request, response: Response) {

    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    // SELECT * FROM surveys WHERE title = 'title';
    const surveyAlreadyExists = await surveysRepository.findOne({
      title
    });

    if (surveyAlreadyExists) {
      return response.status(400).json({
        error: 'Survey already exists!'
      });
    };

    // INSERT INTO surveys (column, column) VALUES ('value', 'value')
    const survey = await surveysRepository.create({
      title,
      description
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  };

  async update(request: Request, response: Response) {

    const { id, title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    let survey = await surveysRepository.findOne({
      id
    });

    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not exists!'
      });
    };

    // UPDATE users SET column = 'value', ..., updated_at = CURRENT_TIMESTAMP WHERE id = 'id'
    await surveysRepository.update(
      {
        id
      },
      {
        title,
        description
      }
    );

    survey = await surveysRepository.findOne({
      id
    });

    return response.status(202).json(survey);
  };

  async delete(request: Request, response: Response) {

    const { id } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = await surveysRepository.findOne({
      id
    });

    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not exists!'
      });
    };

    await surveysRepository.delete({
      id
    });

    return response.status(204).json();
  }

};

export { SurveysController };
