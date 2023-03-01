import express, { Request, Response } from "express";
import mongoose from "mongoose";
import User from "./models/User";
import Filmlist from "./models/Filmlist";
import { config } from 'dotenv';
import { getFilmListsController } from "./controllers/getFilmListsController";

import cors from "cors";
import { createFilmListController } from "./controllers/createFilmListController";
import { createUserController } from "./controllers/createUserController";
import { loginUserController } from "./controllers/loginUserController";
import { addLikeController } from "./controllers/addLikeController";
import { addCommentController } from "./controllers/addCommentController";
import { deleteCommentController } from "./controllers/deleteCommentController";
import { getMoviesController } from "./controllers/getMoviesController";
import { editFilmListController } from "./controllers/editFilmListController";
import { getFilmListController } from "./controllers/getFilmListController";
config();
const app = express();

const PORT: number = 5000;
app.use(express.json());
app.use(cors());

app.post("/api/login", loginUserController);

app.put("/api/commentfilmlist", addCommentController);

app.post("/api/register", createUserController);

app.post("/api/filmlists", getFilmListController);

app.get("/api/filmlists", getFilmListsController);

app.post("/api/filmlist", createFilmListController);

app.put("/api/filmlist", editFilmListController);

app.put("/api/like", addLikeController);

app.put("/api/comment", addCommentController);

app.delete("/api/comment", deleteCommentController);

app.get("/api/movies", getMoviesController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
