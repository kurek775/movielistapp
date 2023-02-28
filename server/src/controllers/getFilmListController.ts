import { Request, Response } from "express";
import mongoose from "mongoose";
import Filmlist from "../models/Filmlist";

export async function getFilmListController(req: Request, res: Response) {

   const filmlists = await Filmlist.find({owner:req.body.id})

   res.json(filmlists)
}