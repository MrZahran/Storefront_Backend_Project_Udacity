import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app: express.Application = express();
const adress: string = "localhost";

app.use(bodyParser.json());

app.use("/api", routes);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.listen(3000, function () {
  console.log(`Startinn App on ${adress}`);
});

export default app;
