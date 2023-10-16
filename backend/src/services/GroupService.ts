import connection from "../models/connection";
import GroupModel from "../models/GroupModel";

class GroupService {
  public model: GroupModel;

  constructor() {
    this.model = new GroupModel(connection);
  }

  public async getGroupsByOwnerId(userId: number): Promise<any> {
    const result = await this.model.getGroupsByOwnerId(userId);
    return result;
  }

  public async getGroupsByUserId(userId: number): Promise<any> {
    const result = await this.model.getGroupsByUserId(userId);
    return result;
  }

  public async getAllGroups(userId: number): Promise<any> {
    const result = await this.model.getAllGroups(userId);
    return result;
  }

  public async createGroup(
    name: string,
    description: string,
    studyDays: string,
    hour: string,
    modality: string,
    userId: number
  ): Promise<void> {
    await this.model.createGroup(name, description, studyDays, hour, modality, userId);
  }

  public async createWarning(
    description: string,
    groupId: number
  ): Promise<void> {
    await this.model.createWarning(description, groupId);
  }

  public async deleteWarning(id: number): Promise<void> {
    await this.model.deleteWarning(id);
  }

  public async getWarnings(groupId: number): Promise<any[]> {
    const result = await this.model.getWarnings(groupId);
    return result;
  }
}

export default GroupService;
