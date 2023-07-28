import { Router } from 'express';
import MeetingController from '../controllers/MeetingsController';

const router = Router();

const meetingController = new MeetingController();

router.get('/:id', meetingController.createMeeting);

export default router;