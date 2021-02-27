import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
router.get('/users', userController.listAll);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

const surveyController = new SurveyController();
router.get('/surveys', surveyController.listAll);
router.post('/surveys', surveyController.create);
router.put('/surveys/:id', surveyController.update);
router.delete('/surveys/:id', surveyController.delete);

export { router };