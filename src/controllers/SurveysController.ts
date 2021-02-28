import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {

  async show(request: Request, response: Response) {

    const { title } = request.body;

    const surveysRespository = getCustomRepository(SurveysRepository);

    if (title) {

      // SELECT * FROM surveys WHERE title = 'title';
      const survey = await surveysRespository.findOne({
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
    const surveys = await surveysRespository.find();

    return response.status(200).json(surveys);
  };

  async create(request: Request, response: Response) {

    const { title, description } = request.body;

    const surveysRespository = getCustomRepository(SurveysRepository);

    // SELECT * FROM surveys WHERE title = 'title';
    const surveyAlreadyExists = await surveysRespository.findOne({
      title
    });

    if (surveyAlreadyExists) {
      return response.status(400).json({
        error: 'Survey already exists!'
      });
    };

    // INSERT INTO surveys (column, column) VALUES ('value', 'value')
    const survey = await surveysRespository.create({
      title,
      description
    });

    await surveysRespository.save(survey);

    return response.status(201).json(survey);
  };

  async update(request: Request, response: Response) {

    const { id, title, description } = request.body;

    const surveysRespository = getCustomRepository(SurveysRepository);

    let survey = await surveysRespository.findOne({
      id
    });

    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not exists!'
      });
    };

    // UPDATE users SET column = 'value', ..., updated_at = CURRENT_TIMESTAMP WHERE id = 'id'
    await surveysRespository.update(
      {
        id
      },
      {
        title,
        description
      }
    );

    survey = await surveysRespository.findOne({
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
