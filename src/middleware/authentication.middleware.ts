import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authFromHeader = req.get("Authorization");

    if (authFromHeader) {
      const bearer = authFromHeader.split(" ")[0].toLowerCase();
      const token = authFromHeader.split(" ")[1];

      // console.log(bearer);
      // console.log(token);

      if (token && bearer === "bearer") {
        const decode = jwt.verify(token, config.token as string);
        if (decode) {
          next();
        } else {
          console.log("------------------ Failed ------------------");
        }
      } else {
        console.log("No Token");
      }
    } else {
      console.log("No Token");
    }
  } catch (error) {
    throw error;
  }
};

export default tokenMiddleware;
