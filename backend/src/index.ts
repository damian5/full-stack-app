import express from "express";
import apiRouter from "./routes/api";
import { hydrate } from "./db/hydrate";
import cors from "cors";

import "./db/init";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

try {
  await hydrate();

  app.use("/api", apiRouter);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Error during server initialization:", error);
  process.exit(1);
}
