import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { SurveysUsersController } from './controllers/SurveysUsersController';
import { UsersController } from './controllers/UsersController';

const router = Router();

const usersController = new UsersController();
router.get('/users', usersController.show);
router.post('/users', usersController.create);
router.put('/users', usersController.update);
router.delete('/users', usersController.delete);

const surveysController = new SurveysController();
router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);
router.put('/surveys', surveysController.update);
router.delete('/surveys', surveysController.delete);

const surveysUsersController = new SurveysUsersController();
router.get('/surveysUsers', surveysUsersController.show);
router.post('/surveysUsers', surveysUsersController.create);

export { router };