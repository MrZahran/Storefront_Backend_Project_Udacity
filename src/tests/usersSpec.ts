import UserModel from "../models/user.model";
import User from "../database/types/user.type";
import db from "../database";
import supertest from "supertest";
import app from "../index";

const reqTest = supertest(app);
const userModel = new UserModel();
let token = "";

describe("EndPoints Tests", () => {
  const newUser: User = {
    id: 1,
    email: "test_1@mail.com",
    username: "test name",
    password: "testPass",
  };

  beforeAll(async () => {
    // console.log("Creating Email....");
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

    const users = await userModel.getAllUsers();
    expect(users.length).toBeGreaterThan(0);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(newUser.id);
    expect(res.body.data.email).toBe(newUser.email);

    token = res.body.data.token;
  });

  /*
    Create User With Token
  */
  it("Create User With Token", async () => {
    const createUser: User = {
      id: 2,
      email: "test_2@mail.com",
      username: "test_name",
      password: "test__Pass",
    };
    const res = await reqTest
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(createUser);

    const users = await userModel.getAllUsers();
    expect(users.length).toBeGreaterThan(0);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createUser.id);
    expect(res.body.email).toBe(createUser.email);
    expect(res.body.username).toBe(createUser.username);
  });

  it("Get All Users", async () => {
    const res = await reqTest
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Get User By Id", async () => {
    const res = await reqTest
      .get("/api/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.id).toBe(1);
  });

  it("Update Data", async () => {
    const createUser_2: User = {
      id: 2,
      email: "test_3@mail.com",
      username: "test_name",
      password: "test__Pass",
    };

    const res = await reqTest
      .patch("/api/users")
      .send(createUser_2)
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.id).toBe(createUser_2.id);
    expect(res.body.email).toBe(createUser_2.email);
    expect(res.body.username).toBe(createUser_2.username);
  });

  it("Delete User By Id", async () => {
    const res = await reqTest
      .delete("/api/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.id[1]).toBe(undefined);
  });
});

describe("Return Data When Correct Data && Return Null When Wrong Data", () => {
  // Insert Fake Data To DB
  const fakeUser: User = {
    id: 2,
    email: "fake@mail.com",
    username: "fake name",
    password: "123",
  };

  beforeAll(async () => {
    const createUser = await userModel.create(fakeUser);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM users";
    await connection.query(sql);
    connection.release();
  });

  it("Data Return From Authenticate", async () => {
    const auth = await userModel.authenticate_users(
      fakeUser.email,
      fakeUser.password
    );

    expect(auth?.email).toBe(fakeUser.email);
    expect(auth?.username).toBe(fakeUser.username);
  });

  it("Return NULL if Wrong Data", async () => {
    const auth = await userModel.authenticate_users(
      "fakemail@mail.com",
      "fakePassword"
    );
    expect(auth).toBe(null);
  });
});
