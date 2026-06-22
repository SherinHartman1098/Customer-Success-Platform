import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    //return res.status(200).json(result);
    return res.status(200).json({
      message: result.message, // for debugging only
      token: result.token,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller function for logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller function for validating token
export const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const result = await authService.getCurrentUser(userId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
