import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/groups/:id', userController.getUsersInGroup);
router.post("/groups/:groupId/users/:userId", userController.insertUserInGroup);
router.post('/create-user', userController.createUser);
router.get('/login', userController.login);
router.post('/login/auth', userController.auth);

export default router;