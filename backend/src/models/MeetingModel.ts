import {
  Pool,
  ResultSetHeader,
} from "mysql2/promise";
import UserModel from "./User.model";

class MeetingModel {
  private connection: Pool;
  public model: UserModel;

  constructor(connection: Pool) {
    this.connection = connection;
    this.model = new UserModel(connection);
  }

  public async createMeeting(groupId: number): Promise<void> {
    const [result] = await this.connection.execute(
      "INSERT INTO caminheirosdb.Meetings (groupId) VALUES (?)",
      [groupId]
    );
    const meetingId = (result as ResultSetHeader).insertId;

    const users = await this.model.getUsersByGroupId(groupId);

    const promises = users.map(async (user) => {
      await this.connection.execute(
        "INSERT INTO caminheirosdb.Meetings_has_users (meetingId, userId, frequency) VALUES (?, ?, ?)",
        [meetingId, user.id, false]
      );
    });

    await Promise.all(promises);
  }
}

export default MeetingModel;
