import Product from "../database/types/product";
import db from "../database";
import supertest from "supertest";
import app from "../index";

const reqTest = supertest(app);

describe("Create New Product", () => {
  const newProduct: Product = {
    id: 1,
    title: "PC",
    price: 100,
  };

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
});
