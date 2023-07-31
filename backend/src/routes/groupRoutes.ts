import { Router } from 'express';
import GroupController from '../controllers/GroupController';

const router = Router();

const groupController = new GroupController();

router.get('/:id', groupController.getGroupsByOwnerId);

export default router;