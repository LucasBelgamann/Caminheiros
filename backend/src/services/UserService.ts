import { IUser } from "../interfaces/IUser";
import connection from "../models/connection";
import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs";

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAllUsers(): Promise<Array<IUser>> {
    const result = await this.model.getAllUsers();
    return result;
  }

  public async getUserById(userId: number): Promise<Array<IUser>> {
    const result = await this.model.getUserById(userId);
    return result;
  }

  public async getUsersExcludedFromGroup(
    groupId: number,
    userId: number
  ): Promise<IUser[]> {
    const result = await this.model.getUsersExcludedFromGroup(groupId, userId);
    return result;
  }

  public async getUsersInGroup(groupId: number): Promise<Array<IUser>> {
    const result = await this.model.getUsersInGroup(groupId);
    return result;
  }

  public async createUser(
    name: string,
    phone: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ): Promise<void> {
    await this.model.createUser(name, phone, email, password, role);
  }

  public async insertUserInGroup(
    groupId: number,
    userId: number
  ): Promise<void> {
    await this.model.insertUserInGroup(groupId, userId);
  }

  public async deleteUserInGroup(
    groupId: number,
    userId: number
  ): Promise<void> {
    await this.model.deleteUserInGroup(groupId, userId);
  }

  public async findUserByEmailAndPassword(
    email: string
  ): Promise<IUser | null> {
    const user = await this.model.findUserByEmailAndPassword(email);
    return user;
  }

  public async getInativeUsers(groupId: number): Promise<Array<IUser>> {
    const result = await this.model.getInativeUsers(groupId);
    return result;
  }

  public async updateUserDetails(
    userId: number,
    phone: string,
    email: string
  ): Promise<void> {
    await this.model.updateUserDetails(userId, phone, email);
  }

  public async updateUserPassword(
    password: string,
    userId: number
  ): Promise<void> {
    await this.model.updateUserPassword(password, userId);
  }

    public async createPasswordResetToken(
    userId: any,
    token: string,
    expiration: Date
  ): Promise<void> {
    await this.model.createPasswordResetToken(userId, token, expiration);
  }
}

export default UserService;
