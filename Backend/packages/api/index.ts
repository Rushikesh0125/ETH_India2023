import * as cors from "cors";
import * as express from "express";
const dotenv = require("dotenv");

dotenv.config();

console.log("yo",process.env.GOERLI_URL);

import { type FormData } from "../deployer/src/types/FormData";
import { runDeployer } from "../deployer/src/runDeployer";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post("/deploy", async (req, res) => {
  const body = req.body as FormData;
  try {
    await runDeployer(body);
    return res.status(200).json({ message: "Deployed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

process.on("uncaughtException", function (err) {
  console.log("Uncaught exception: ", err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
