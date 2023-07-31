import { Request, Response } from "express";
import GroupService from "../services/GroupService";

class GroupController {
  constructor(private groupService = new GroupService()) {}

  public getGroupsByOwnerId = async (req: Request, res: Response) => {
    const groupId = req.params.id;

    const result = await this.groupService.getGroupsByOwnerId(Number(groupId))

    return res.status(200).json(result);
  };
}

export default GroupController;
