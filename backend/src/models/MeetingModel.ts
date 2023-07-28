import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import UserModel from "./UserModel";

class MeetingModel {
  private connection: Pool;
  public model: UserModel;

  constructor(connection: Pool) {
    this.connection = connection;
    this.model = new UserModel(connection);
  }

  public async createMeeting(groupId: number): Promise<void> {
    const currentDateTime = new Date();

    const formattedDateTime = `CONVERT_TZ('${currentDateTime.toISOString()}', '+00:00', '-03:00')`;

    const [result] = await this.connection.execute(
      `INSERT INTO caminheirosdb.Meetings (groupId, created_at) VALUES (?, ${formattedDateTime})`,
      [groupId]
    );

    const meetingId = (result as ResultSetHeader).insertId;

    const users = await this.model.getUsersInGroup(groupId);

    const promises = users.map(async (user) => {
      await this.connection.execute(
        `INSERT INTO caminheirosdb.Meetings_has_users (meetingsId, userId, frequency, created_at) VALUES (?, ?, ?, ${formattedDateTime})`,
        [meetingId, user.id, false]
      );
    });

    await Promise.all(promises);
  }

  public async updateFrequencyToTrue(
    meetingId: number,
    userId: number
  ): Promise<void> {
    await this.connection.execute(
      "UPDATE caminheirosdb.Meetings_has_users SET frequency = ? WHERE meetingsId = ? AND userId = ?",
      [true, meetingId, userId]
    );
  }

  public async getRecentMeetings(groupId: number): Promise<RowDataPacket[]> {
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    const [rows] = await this.connection.execute(
      "SELECT * FROM caminheirosdb.Meetings WHERE groupId = ? AND created_at >= ?",
      [groupId, twoHoursAgo]
    );

    return rows as RowDataPacket[];
  }
}

export default MeetingModel;
