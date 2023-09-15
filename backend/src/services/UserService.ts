import { IUser } from "../interfaces/IUser";
import connection from "../models/connection";
import UserModel from "../models/UserModel";
import bcrypt from 'bcryptjs';

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

  public async getUsersExcludedFromGroup(groupId: number, userId: number): Promise<IUser[]> {
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
    await this.model.createUser(
      name,
      phone,
      email,
      password,
      role
    );
  }

  public async insertUserInGroup(groupId: number, userId: number): Promise<void> {
    await this.model.insertUserInGroup(groupId, userId)
  }

  public async deleteUserInGroup(groupId: number, userId: number): Promise<void> {
    await this.model.deleteUserInGroup(groupId, userId)
  }

  public async findUserByEmailAndPassword(email: string): Promise<IUser | null> {
    const user = await this.model.findUserByEmailAndPassword(email)
    return user;
  }
}

export default UserService;
