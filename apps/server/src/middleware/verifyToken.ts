import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

import { CustomRequest } from "../types/requests";

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(401);
    }

    // if the current time is greater than the expiration time (meaning token expired, redirect to login)
    if (Math.floor(Date.now() / 1000) > decoded.exp) {
      return res.status(401).json({ error: "Token expired" });
    }

    req.decoded = decoded; // store the decoded token in the request object for later use
    next(); // move to the next middleware or the actual handler
  });
};
