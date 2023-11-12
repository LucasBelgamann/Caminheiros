import { Router } from 'express';
import UserController from '../controllers/UserController';
import LoginController from '../controllers/LoginController';

const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id/user/:userId', userController.getUsersExcludedFromGroup);
router.get('/groups/:id', userController.getUsersInGroup);
router.post("/groups/:groupId/users/:userId", userController.insertUserInGroup);
router.post("/groups/:groupId/delete-user/:userId", userController.deleteUserInGroup);
router.post('/create-user', userController.createUser);
router.get('/inactives/:id', userController.getInativeUsers);
router.put('/update-user-data', userController.updateUserDetails);

// Rotas de login
router.get('/login', loginController.login);
router.post('/login/auth', loginController.auth);
router.post('/reset-password-request', loginController.sendPasswordResetEmail);
router.post('/update-user-password', loginController.updateUserPassword);
router.post('/check-token-validity', loginController.checkTokenValidity);

export default router;