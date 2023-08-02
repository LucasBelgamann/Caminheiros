import { Request, Response } from "express";
import GroupService from "../services/GroupService";

class GroupController {
  constructor(private groupService = new GroupService()) {}

  public getGroupsByOwnerId = async (req: Request, res: Response) => {
    const ownerId = Number(req.params.id);

    if (isNaN(ownerId)) {
      return res.status(400).json({ message: "Invalid ownerId." });
    }

    try {
      const result = await this.groupService.getGroupsByOwnerId(ownerId);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error getting groups by ownerId:", error);
      return res.status(500).json({ message: "Failed to get groups by ownerId." });
    }
  };

  public getGroupsByUserId = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    try {
      const result = await this.groupService.getGroupsByUserId(userId);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error getting groups by userId:", error);
      return res.status(500).json({ message: "Failed to get groups by userId." });
    }
  };
}

export default GroupController;
