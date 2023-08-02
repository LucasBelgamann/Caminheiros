import { Request, Response } from "express";
import MeetingService from "../services/MeetingsService";

class MeetingController {
  constructor(private meetingService = new MeetingService()) {}

  public createMeeting = async (req: Request, res: Response) => {
    const groupId = req.params.id;

    await this.meetingService.createMeeting(Number(groupId));

    return res.status(200).json({ message: "Meeting created successfully." });
  };

  public updateFrequencyToTrue = async (req: Request, res: Response) => {
    const meetingId = Number(req.params.meetingId);
    const userId = Number(req.params.userId);

    await this.meetingService.updateFrequencyToTrue(meetingId, userId);

    return res.status(200).json({ message: "Frequency updated to true." });
  };

  public getRecentMeetings = async (req: Request, res: Response) => {
    const groupId = req.params.id;

    const result = await this.meetingService.getRecentMeetings(Number(groupId));

    return res.status(200).json(result);
  };

  public getHistory = async (req: Request, res: Response) => {
    const meetingDate = req.body;
    const groupId = Number(req.params.id);

    const result = await this.meetingService.getHistory(meetingDate, groupId)

    return res.status(200).json(result);
  };
}

export default MeetingController;
