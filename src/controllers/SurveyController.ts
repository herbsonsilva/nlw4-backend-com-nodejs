import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {

  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRespository = getCustomRepository(SurveysRepository);

    const survey = surveysRespository.create({
      title,
      description
    });

    await surveysRespository.save(survey);

    return response.status(201).json(survey);
  }

};

export { SurveyController };
