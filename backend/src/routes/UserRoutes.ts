import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/groups/:id', userController.getUsersInGroup);

export default router;