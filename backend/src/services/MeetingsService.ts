import connection from "../models/connection";
import MeetingModel from "../models/MeetingModel";

class MeetingService {
  public model: MeetingModel;

  constructor() {
    this.model = new MeetingModel(connection);
  }

  public async createMeeting(groupId: number): Promise<void> {
    await this.model.createMeeting(groupId);
  }

  public async updateFrequency(
    meetingId: number,
    userId: number,
    newFrequency: boolean
  ): Promise<void> {
    await this.model.updateFrequency(meetingId, userId, newFrequency);
  }

  public async getRecentMeetings(groupId: number): Promise<any> {
    const result = await this.model.getRecentMeetings(groupId);
    return result;
  }

  public async getHistory(meetingDate: string, groupId: number): Promise<any> {
    const result = await this.model.getHistory(meetingDate, groupId)
    return result;
  }
}

export default MeetingService;
