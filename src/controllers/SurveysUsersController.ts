import { Request, Response } from "express";
import path from 'path';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";


class SurveysUsersController {

  async show(request: Request, response: Response) {

    const { user_id, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // if (user_id) {
    //   const user = await usersRepository.findOne({
    //     id: user_id
    //   });

    //   if (!user) {
    //     return response.status(400).json({
    //       error: 'User does not exists!'
    //     });
    //   };
    // }

    // if (survey_id) {
    //   const survey = await surveysRepository.findOne({
    //     id: survey_id
    //   });

    //   if (!survey) {
    //     return response.status(400).json({
    //       error: 'Survey does not exists!'
    //     });
    //   };
    // }

    // const surveyUser = await surveysUsersRepository.findOne({
    //   user_id,
    //   survey_id
    // })

    // if (!surveyUser) {
    //   return response.status(400).json({
    //     error: 'There is no registered survey for this user!'
    //   });
    // };

    const surveysUsers = await surveysUsersRepository.find();

    return response.status(200).json(surveysUsers);
  }

  async create(request: Request, response: Response) {

    const { user_id, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    /** 
     * Verificar se o usuário existe...
     */
    const user = await usersRepository.findOne({
      id: user_id
    });

    if (!user) {
      return response.status(400).json({
        error: 'User does not exists!'
      });
    };

    /**
     * Verificar se a pesquisa existe...
     */
    const survey = await surveysRepository.findOne({
      id: survey_id
    });

    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not exists!'
      });
    };

    /**
     * Verificar se a pesquisa já cadastrada para o usuário
     */
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      user_id,
      survey_id
    })

    console.log(surveyUserAlreadyExists);

    if (surveyUserAlreadyExists) {
      return response.status(400).json({
        error: 'The survey already exists for this user!'
      })
    }

    /**
     * Salvar relacionamento na tabela surveys_users
     */
    const surveyUser = await surveysUsersRepository.create({
      user_id,
      survey_id
    });

    await surveysUsersRepository.save(surveyUser);

    const npsPath = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'npsMail.hbs'
    );

    const from = "NPS <noreply@nps.com>";

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description
    }

    /**
     * Enviar email com a pesquisa para o usuário
     */
    await SendMailService.execute(from, user.email, survey.title, variables, npsPath);

    return response.status(201).json(surveyUser);

  };

  async delete(request: Request, response: Response) {
    const { user_id, survey_id } = request.body;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      user_id,
      survey_id
    });

    if (!surveyUser) {
      return response.status(400).json({
        error: 'This survey does not exists for this user!'
      });
    }

    await surveysUsersRepository.delete({
      user_id,
      survey_id
    });

    return response.status(204).json();
  };

};

export { SurveysUsersController };
