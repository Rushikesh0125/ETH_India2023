import cors from "cors";
import express from "express";
import { type FormData } from "../deployer/src/types/FormData";
import { runDeployer } from "../deployer/src/runDeployer";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post("/deploy", (req, res) => {
  const body = req.body as FormData;
  try {
    runDeployer(body);
    return res.status(200).json({ message: "Deployed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

process.on("uncaughtException", function (err) {
  console.log("Uncaught exception: ", err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
