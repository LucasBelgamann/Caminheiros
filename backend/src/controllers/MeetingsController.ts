import { Request, Response } from "express";
import MeetingService from "../services/MeetingsService";

class MeetingController {
  constructor(private meetingService = new MeetingService()) {}

  public createMeeting = async (req: Request, res: Response) => {
    const groupId = Number(req.params.id);

    const result = await this.meetingService.getRecentMeetings(groupId);

    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid groupId." });
    }

    if (result.length > 0) {
      return res.status(400).json({  message: "Já existe uma reunião para o mesmo grupo nas últimas duas horas." })
    }

    try {
      await this.meetingService.createMeeting(groupId);
      return res.status(200).json({ message: "Meeting created successfully." });
    } catch (error) {
      console.error("Error creating meeting:", error);
      return res.status(500).json({ message: "Failed to create meeting." });
    }
  };

  public updateFrequencyToTrue = async (req: Request, res: Response) => {
    const meetingId = parseInt(req.params.meetingId, 10);
    const userId = parseInt(req.params.userId, 10);
    const newFrequency = req.body.newFrequency;
  
    try {
      await this.meetingService.updateFrequency(meetingId, userId, newFrequency);
      res.status(200).json(newFrequency);
    } catch (error) {
      console.error("Error updating frequency:", error);
      res.status(500).json({ message: "Error updating frequency" });
    }
  };

  public getRecentMeetings = async (req: Request, res: Response) => {
    const groupId = Number(req.params.id);

    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid groupId." });
    }

    try {
      const result = await this.meetingService.getRecentMeetings(groupId);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error getting recent meetings:", error);
      return res.status(500).json({ message: "Failed to get recent meetings." });
    }
  };

  public getHistory = async (req: Request, res: Response) => {
    const meetingDate = req.body;
    const groupId = Number(req.params.id);

    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid groupId." });
    }

    try {
      const result = await this.meetingService.getHistory(meetingDate, groupId);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error getting meeting history:", error);
      return res.status(500).json({ message: "Failed to get meeting history." });
    }
  };
}

export default MeetingController;
