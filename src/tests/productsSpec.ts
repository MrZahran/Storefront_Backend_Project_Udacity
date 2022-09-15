import Product from "../database/types/product";
import db from "../database";
import supertest from "supertest";
import app from "../index";
import UserModel from "../models/user.model";
import User from "../database/types/user.type";
import ProductModel from "../models/product.model";

const reqTest = supertest(app);
const userModel = new UserModel();
const productModel = new ProductModel();
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

describe("Create New Product", () => {
  const newProduct: Product = {
    id: 1,
    title: "PC",
    price: 100,
  };

  // beforeAll(async () => {
  //   await productModel.createProduct(newProduct);
  // });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM users; DELETE FROM products; \nALTER SEQUENCE users_id_seq RESTART WITH 1; \nALTER SEQUENCE products_id_seq RESTART WITH 1;";
    await connection.query(sql);
    connection.release();
  });

  it("Create Product", async () => {
    const res = await reqTest.post("/api/products/create").send(newProduct);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(newProduct.id);
    expect(res.body.title).toBe(newProduct.title);
  });

  it("Get All Products", async () => {
    const res = await reqTest
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Get Product By Id", async () => {
    const res = await reqTest
      .get("/api/products/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.title).toBe("PC");
    expect(res.body.price).toBe("100");
  });

  it("Update Data", async () => {
    const createProduct_2: Product = {
      id: 1,
      title: "test_33@mail.com",
      price: 100,
    };

    const res = await reqTest
      .patch("/api/products")
      .send(createProduct_2)
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.id).toBe(createProduct_2.id);
    expect(res.body.title).toBe(createProduct_2.title);
    expect(res.body.price).toBe(createProduct_2.price.toString());
  });

  it("Delete Product By Id", async () => {
    const res = await reqTest
      .delete("/api/products/1")
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body);
    expect(res.body.id[1]).toBe(undefined);
  });
});
