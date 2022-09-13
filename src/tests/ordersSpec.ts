import UserModel from "../models/user.model";
import ProductModel from "../models/product.model";
import GenerateOrder from "../models/order.model";
import User from "../database/types/user.type";
import Product from "../database/types/product";
import Order from "../database/types/order.type";
import db from "../database";
import supertest from "supertest";
import app from "../index";

const reqTest = supertest(app);
const userModel = new UserModel();
const productModel = new ProductModel();
const generateOrder = new GenerateOrder();
let userid: number;

describe("Make Order", () => {
  const newUser: User = {
    id: 10,
    email: "mail_3@mail.com",
    username: "test name",
    password: "testPass",
  };

  const newProduct: Product = {
    title: "PC",
    price: 100,
  };

  beforeAll(async () => {
    /* Create New Order && Add New Product */
    const createUser = await userModel.create(newUser);
    const createProduct = await productModel.createProduct(newProduct);
    // console.log(createUser);
    // console.log(createProduct);
    userid = createUser.id as number;
    console.log(userid);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM users; DELETE FROM products; \nALTER SEQUENCE users_id_seq RESTART WITH 1; \nALTER SEQUENCE products_id_seq RESTART WITH 1;";
    await connection.query(sql);
    connection.release();
  });

  it("Make Order Is Run Correct", async () => {
    const newOrder: Order = {
      id: 1,
      qty: 10,
      user_id: userid,
      product_id: 1,
    };
    const createOrder = await generateOrder.create(newOrder);
    console.log(createOrder);

    expect(createOrder.id).toBe(newOrder.id);
    expect(createOrder.qty).toBe(newOrder.qty);
    expect(createOrder.user_id).toBe(newOrder.user_id);
    expect(createOrder.product_id).toBe(newOrder.product_id);
  });
});
