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
let token = "";

describe("Get Token", () => {
  const newUser: User = {
    id: 1,
    email: "test_1@mail.com",
    username: "test name",
    password: "testPass",
  };

  beforeAll(async () => {
    console.log("Creating Email....");
    const createUser = await userModel.create(newUser);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await connection.query(sql);
    connection.release();
  });

  it("When Correct Data Get Token", async () => {
    const res = await reqTest
      .post("/api/users/authenticate")
      .send({ email: "test_1@mail.com", password: "testPass" });

    token = res.body.data.token;
  });
});

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
      user_id: userid,
      status: "Active",
    };
    const createOrder = await generateOrder.create(newOrder);
    console.log(createOrder);

    const products = await productModel.getAllProducts();
    expect(products.length).toBeGreaterThan(0);

    expect(createOrder.id).toBe(newOrder.id);
    expect(createOrder.user_id).toBe(newOrder.user_id);
    expect(createOrder.status).toBe(newOrder.status);
  });

  it("Create Order", async () => {
    const createOrder: Order = {
      id: 2,
      user_id: 1,
      status: "Active",
    };

    const res = await reqTest
      .post("/api/orders/create-order")
      .set("Authorization", `Bearer ${token}`)
      .send(createOrder);

    console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createOrder.id);
    expect(res.body.user_id).toBe(createOrder.user_id);
    expect(res.body.status).toBe(createOrder.status);
  });

  it("Get All Orders", async () => {
    const res = await reqTest
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Get Order By Id", async () => {
    const res = await reqTest
      .get("/api/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.id).toBe(1);
  });

  it("Delete Order By Id", async () => {
    const res = await reqTest
      .delete("/api/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.id[1]).toBe(undefined);
  });
});
