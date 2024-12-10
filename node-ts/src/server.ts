import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "./planets";
import { logIn, signUp, logOut } from "./users";
import multer from "multer";
import "./passport";
import authorize from "./authorize";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);
app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);
app.get("/api/users/logout", authorize, logOut);

app.listen(process.env.PORT, () => {
  console.log(`listening on:  http://localhost:${process.env.PORT}`);
});
