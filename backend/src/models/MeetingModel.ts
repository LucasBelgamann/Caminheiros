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
    const recentMeetings = await this.getRecentMeetings(groupId);

    if (recentMeetings.length > 0) {
      throw new Error(
        "Já existe uma reunião para o mesmo grupo nas últimas duas horas."
      );
    }

    const [result] = await this.connection.execute(
      `INSERT INTO caminheirosdb.Meetings (groupId) VALUES (?)`,
      [groupId]
    );

    const meetingId = (result as ResultSetHeader).insertId;

    const users = await this.model.getUsersInGroup(groupId);

    const promises = users.map(async (user) => {
      await this.connection.execute(
        `INSERT INTO caminheirosdb.Meetings_has_users (meetingsId, userId, frequency) VALUES (?, ?, ?)`,
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
    const [rows] = await this.connection.execute(
      `
      SELECT * FROM caminheirosdb.Meetings
      WHERE groupId = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 2 HOUR)
      AND DATE(created_at) = DATE(NOW());
    `,
      [groupId]
    );

    return rows as RowDataPacket[];
  }
}

export default MeetingModel;
