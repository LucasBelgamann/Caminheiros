import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import UserModel from "./UserModel";
// import { IUser } from "../interfaces/IUser";

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
  public async getRecentMeetings(groupId: number): Promise<any[]> {
    const [rows] = await this.connection.execute(
      `
      SELECT M.*, G.name AS groupName
      FROM caminheirosdb.Meetings AS M
      JOIN caminheirosdb.Groups AS G ON M.groupId = G.id
      WHERE M.groupId = ? AND M.created_at >= DATE_SUB(NOW(), INTERVAL 2 HOUR)
      AND DATE(M.created_at) = DATE(NOW());
      `,
      [groupId]
    );
  
    const meetingsWithGroup = rows as RowDataPacket[];
  
    const meetingsWithUsers = await Promise.all(meetingsWithGroup.map(async (meeting) => {
      const users = await this.getUsersInMeeting(meeting.id);
      return { ...meeting, users };
    }));
  
    return meetingsWithUsers;
  }
  
  public async getUsersInMeeting(meetingId: number): Promise<any[]> {
    const [rows] = await this.connection.execute(
      `
      SELECT U.id, U.name, MU.frequency
      FROM caminheirosdb.Users AS U
      JOIN caminheirosdb.Meetings_has_users AS MU ON U.id = MU.userId
      WHERE MU.meetingsId = ?;
      `,
      [meetingId]
    );
  
    return rows as RowDataPacket[];
  }

  public async getHistory(
    meetingDate: string,
    groupId: number
  ): Promise<any[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      `
    SELECT u.*
    FROM caminheirosdb.Users AS u
    JOIN caminheirosdb.Meetings_has_users AS mu ON u.id = mu.userId
    JOIN caminheirosdb.Meetings AS m ON mu.meetingId = m.id
    WHERE DATE(m.created_at) = ? AND m.groupId = ?;
  `,
      [meetingDate, groupId]
    );

    return result;
  }
}

export default MeetingModel;
