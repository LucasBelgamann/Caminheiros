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
      return res
        .status(500)
        .json({ message: "Failed to get groups by ownerId." });
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
      return res
        .status(500)
        .json({ message: "Failed to get groups by userId." });
    }
  };

  public getAllGroups = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    try {
      const result = await this.groupService.getAllGroups(userId);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error getting groups by userId:", error);
      return res
        .status(500)
        .json({ message: "Failed to get groups by userId." });
    }
  };

  public createGroup = async (req: Request, res: Response) => {
    const groupData = Array.isArray(req.body) ? req.body : [req.body];

    try {
      for (const groupObject of groupData) {
        const { name, description, studyDays, hour, modality, userId } = groupObject;

        await this.groupService.createGroup(
          name,
          description,
          studyDays,
          hour,
          modality,
          userId
        );
      }

      return res.status(200).json({ message: "Group created successfully." });
    } catch (error) {
      console.error("Error during Group creation:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  public createWarning = async (req: Request, res: Response) => {
    const { description, groupId } = req.body;

    try {
      await this.groupService.createWarning(description, groupId);

      return res.status(200).json({ message: "Warning created successfully." });
    } catch (error) {
      console.error("Error during Warning creation:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  public deleteWarning = async (req: Request, res: Response) => {
    const warningId = Number(req.params.id);

    try {
      await this.groupService.deleteWarning(warningId);

      return res.status(200).json({ message: "Warning successfully deleted." });
    } catch (error) {
      console.error("Error during Warning deletetion:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  public getWarnings = async (req: Request, res: Response) => {
    const groupId = Number(req.params.id);

    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid groupId." });
    }

    try {
      const result = await this.groupService.getWarnings(groupId);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error getting warnings by groupId:", error);
      return res
        .status(500)
        .json({ message: "Failed to get warnings by groupId." });
    }
  };
}

export default GroupController;
