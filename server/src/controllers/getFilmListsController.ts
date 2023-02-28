import { Request, Response } from "express";
import Filmlist from "../models/Filmlist";

export async function getFilmListsController(req: Request, res: Response) {
    const list = await Filmlist.find();
    res.json(list);
}


