import type { NextFunction, Response, Request } from "express";
import type { AuthRequest } from "../middleware/auth.js";
import User from "../models/User.js";
import { clerkClient, getAuth } from "@clerk/express";

export async function getMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
}

export async function authCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      user = await User.create({
        clerkId,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0],
        email: clerkUser.emailAddresses[0]?.emailAddress,
        avatar: clerkUser.imageUrl,
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500);
    next(error);
  }
}
