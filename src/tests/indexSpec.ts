import { Request, Response } from "express";

import app from "../index";

it("Check Server Is Running", () => {
  app.get("/", (req: Request, res: Response) => {
    expect(res.status).toBe(200);
  });
});
