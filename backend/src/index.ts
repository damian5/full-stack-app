import express from "express";

import "./db/init";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Error during server initialization:", error);
  process.exit(1);
}
