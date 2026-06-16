import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId: number, email: string) => {
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign({ userId, email }, jwtSecret, { expiresIn: "1h" });
};
