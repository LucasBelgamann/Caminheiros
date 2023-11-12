import { IUser } from "../interfaces/IUser";
import connection from "../models/connection";
import UserModel from "../models/UserModel";

class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async findUserByEmailAndPassword(
    email: string
  ): Promise<IUser | null> {
    const user = await this.model.findUserByEmailAndPassword(email);
    return user;
  }

  public async createPasswordResetToken(
    userId: any,
    token: string,
    expiration: Date
  ): Promise<void> {
    await this.model.createPasswordResetToken(userId, token, expiration);
  }

  public async updateUserPassword(
    password: string,
    userId: any
  ): Promise<void> {
    await this.model.updateUserPassword(password, userId);
  }

  public async findUserByPasswordResetToken(
    token: string
  ): Promise<IUser | null> {
    const result = await this.model.findUserByPasswordResetToken(token);
    return result;
  }

  public async clearPasswordResetToken(token: string): Promise<void> {
    await this.model.clearPasswordResetToken(token);
  }
}

export default LoginService;
