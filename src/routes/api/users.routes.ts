import { Router, Request, Response } from "express";
import UserModel from "../../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import tokenMiddleware from "../../middleware/authentication.middleware";

const userModel = new UserModel();
const routes = Router();

/* Create User */
routes.post("/", async (req: Request, res: Response) => {
  try {
    const user = await userModel.create(req.body);
    res.send(user);
  } catch (erorr) {
    throw erorr;
  }
});

/* Get All User ( Get Many ) */
routes.get("/", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const allUser = await userModel.getAllUsers();
    res.send(allUser);
    console.log(allUser);
  } catch (erorr) {
    throw erorr;
  }
});

/* Get One User By ID ( Get One ) */
routes.get("/:id", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const oneUser = await userModel.getOneUser(req.params.id as string);
    res.send(oneUser);
    console.log(oneUser);
  } catch (erorr) {
    throw erorr;
  }
});

/* Update User */
routes.patch("/", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const newUser = await userModel.updateUser(req.body);
    res.send(newUser);
    console.log(newUser);
  } catch (erorr) {
    throw erorr;
  }
});

/* Delete User */
routes.delete("/:id", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const oneUser = await userModel.deleteUser(req.params.id as string);
    res.send(oneUser);
    console.log(oneUser);
  } catch (erorr) {
    throw erorr;
  }
});

/* Authenticate Users */
routes.post("/authenticate", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;

    const user = await userModel.authenticate_users(email, pass);
    const token = jwt.sign({ user }, config.token as string);

    if (!user) {
      return res.send("Username or Password Not Correct");
    }

    return res.json({
      data: { ...user, token },
    });
  } catch (erorr) {
    throw erorr;
  }
});

export default routes;
