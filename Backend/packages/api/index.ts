import * as cors from "cors";
import * as express from "express";
const dotenv = require("dotenv");

dotenv.config();

import { type FormData } from "../deployer/src/types/FormData";
import { runDeployer } from "../deployer/src/runDeployer";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post("/deploy", async (req, res) => {
  const body = req.body as string;

  try {
    const parsedBody = JSON.parse(JSON.stringify(body)) as FormData;

    if (!parsedBody || Object.keys(parsedBody).length === 0) {
      return res.status(400).json({ message: "Invalid body" });
    }
    await runDeployer(parsedBody);
    return res.status(200).send({ message: "Deployed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

process.on("uncaughtException", function (err) {
  console.log("Uncaught exception: ", err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
