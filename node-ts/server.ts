import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import { getAll, getOneById, create, updateById, deleteById } from "./planets";
const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);
app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.listen(process.env.PORT, () => {
  console.log(`listening on:  http://localhost:${process.env.PORT}`);
});
