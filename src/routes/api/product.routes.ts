import { Router, Request, Response } from "express";
import ProductModel from "../../models/product.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import tokenMiddleware from "../../middleware/authentication.middleware";

const productModel = new ProductModel();

const routes = Router();

/* Create Product */
routes.post("/create", async (req: Request, res: Response) => {
  try {
    const product = await productModel.createProduct(req.body);
    res.send(product);
  } catch (erorr) {
    throw erorr;
  }
});

/* Get All Products ( Get Many ) */
routes.get("/", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const getAllProducts = await productModel.getAllProducts();
    res.send(getAllProducts);
    // console.log(allUser);
  } catch (erorr) {
    throw erorr;
  }
});

/* Get One User By ID ( Get One ) */
routes.get("/:id", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const oneProduct = await productModel.getOneProduct(
      req.params.id as string
    );
    res.send(oneProduct);
    // console.log(oneProduct);
  } catch (erorr) {
    throw erorr;
  }
});

/* Update User */
routes.patch("/", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const newProducts = await productModel.updateProducts(req.body);
    res.send(newProducts);
    console.log(newProducts);
  } catch (erorr) {
    throw erorr;
  }
});

/* Delete User */
routes.delete("/:id", tokenMiddleware, async (req: Request, res: Response) => {
  try {
    const deleteProducts = await productModel.deleteProducts(
      req.params.id as string
    );
    res.send(deleteProducts);
    console.log(deleteProducts);
  } catch (erorr) {
    throw erorr;
  }
});

export default routes;
