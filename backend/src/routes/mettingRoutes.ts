import { Router } from 'express';
import MeetingController from '../controllers/MeetingsController';

const router = Router();

const meetingController = new MeetingController();

router.post('/:id', meetingController.createMeeting);
router.put("/update-frequency/:meetingId/users/:userId", meetingController.updateFrequencyToTrue);
router.get('/recent/:id', meetingController.getRecentMeetings);
router.get('/history/:id/date/:meetingDate', meetingController.getHistory);

export default router;