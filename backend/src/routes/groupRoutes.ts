import { Router } from 'express';
import GroupController from '../controllers/GroupController';

const router = Router();

const groupController = new GroupController();

router.get('/owner/:id', groupController.getGroupsByOwnerId);
router.get('/user/:id', groupController.getGroupsByUserId);
router.get('/all/:id', groupController.getAllGroups);
router.post('/create-group', groupController.createGroup);

export default router;
