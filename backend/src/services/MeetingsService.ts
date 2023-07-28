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
}

export default MeetingService;