import { Request, Response } from "express";
import MeetingService from "../services/MeetingsService";

class MeetingController {
  constructor(private meetingService = new MeetingService()) {}

  public createMeeting = async (req: Request, res: Response) => {
    const groupId = req.params.id;

    await this.meetingService.createMeeting(Number(groupId))

    return res.status(200).json({ message: "Meeting created successfully." });
  };
}

export default MeetingController;
