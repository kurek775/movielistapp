import { Request, Response } from "express";
import Filmlist from "../models/Filmlist";

export async function createFilmListController(req: Request, res: Response) {
    const newFilmList = new Filmlist({
        name: req.body.name,
        owner: req.body.owner,
        ownerName: req.body.ownerName,
        movies: req.body.movies,
        thread: req.body.thread
      });
       const createdList =  await newFilmList.save();
       res.json(createdList);
}


