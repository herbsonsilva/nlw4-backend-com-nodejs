import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
router.get('/users', userController.show);
router.post('/users', userController.create);
router.put('/users', userController.update);
router.delete('/users', userController.delete);

const surveyController = new SurveyController();
router.get('/surveys', surveyController.show);
router.post('/surveys', surveyController.create);
router.put('/surveys', surveyController.update);
router.delete('/surveys', surveyController.delete);

export { router };