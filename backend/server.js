import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

import productsRoutes from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT_BE || 3000;
const __dirname = path.resolve();

const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/products", productsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// postman desktop app

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
