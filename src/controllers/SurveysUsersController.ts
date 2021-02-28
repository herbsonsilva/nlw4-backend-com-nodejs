import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class SurveysUsersController {

  async execute(request: Request, response: Response) {

    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    /** 
     * Verificar se o usuário existe...
     */
    const user = await userRepository.findOne({
      email
    });

    if (!user) {
      return response.status(400).json({
        error: 'User does not exists!'
      });
    };

    /**
     * Verificar se a pesquisa existe...
     */
    const survey = surveyRepository.findOne({
      id: survey_id
    });

    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not exists!'
      });
    };

    /**
     * Salvar relacionamento na tabela surveys_users
     */
    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveyUserRepository.save(surveyUser);

    return response.status(201).json(surveyUser);

    /**
     * Enviar email com a pesquisa para o usuário
     */




  };

};

export { SurveysUsersController };