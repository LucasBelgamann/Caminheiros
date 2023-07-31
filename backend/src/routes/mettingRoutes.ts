import { Router } from 'express';
import MeetingController from '../controllers/MeetingsController';

const router = Router();

const meetingController = new MeetingController();

router.post('/:id', meetingController.createMeeting);
router.post("/update-frequency/:meetingId/users/:userId", meetingController.updateFrequencyToTrue);
router.get('/recent/:id', meetingController.getRecentMeetings);

export default router;