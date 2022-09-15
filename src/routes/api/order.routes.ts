import { Router, Request, Response } from "express";
import OrderModel from "../../models/order.model";
import tokenMiddleware from "../../middleware/authentication.middleware";

const orderModel = new OrderModel();
const routes = Router();

/* Create Order */
routes.post(
  "/create-order",
  tokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const createOrder = await orderModel.create(req.body);
      res.send(createOrder);
    } catch (erorr) {
      throw erorr;
    }
  }
);

/* Get All Orders */
routes.get("/", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const getAllOrders = await orderModel.getAllOrders();
    res.send(getAllOrders);
  } catch (erorr) {
    throw erorr;
  }
});

/* Get Order By UserID */
routes.get(
  "/:user_id",
  tokenMiddleware,
  async (req: Request, res: Response) => {
    try {
      const getOrder = await orderModel.getOrder(req.params.user_id);
      res.send(getOrder);
    } catch (erorr) {
      throw erorr;
    }
  }
);

/* Update User */
routes.patch("/", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const newOrder = await orderModel.updateOrder(req.body);
    res.send(newOrder);
    console.log(newOrder);
  } catch (erorr) {
    throw erorr;
  }
});

/* Delete User */
routes.delete("/:id", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const oneUser = await orderModel.deleteOrder(req.params.id as string);
    res.send(oneUser);
    console.log(oneUser);
  } catch (erorr) {
    throw erorr;
  }
});

export default routes;
