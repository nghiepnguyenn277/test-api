import express from "express";
import bodyPaser from "body-parser";
import cors from "cors";

import productsRoutes from "./routes/products.js";

const app = express();
const port = 80;


app.use(bodyPaser.json());
app.use(cors());

app.use("/", productsRoutes)
app.get("/", (req, res) => res.send("Helllo"));
app.all("*", (req, res) => res.send("That routes doesn't exist"))
app.listen(port, () =>
    console.log(`server is run port ${port}`)
);