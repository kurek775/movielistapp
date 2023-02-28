import { Request, Response } from "express";
import Filmlist from "../models/Filmlist";

export async function editFilmListController(req: Request, res: Response) {
   const filmlists = await Filmlist.findByIdAndUpdate(
    req.body.id,{
        $push: {
            movies:{
                $each: [req.body.movie],
                $slice: 10
            }
        } 
    }
   )
   res.json(filmlists)
}