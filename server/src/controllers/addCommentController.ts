import { Request, Response } from "express";
import Filmlist from "../models/Filmlist";

export async function addCommentController(req: Request, res: Response) {
    const filmlists = await Filmlist.findByIdAndUpdate(
        req.body.id,{
            $push: {
                thread:{
                    $each: [req.body.thread]
                }
            } 
        }
       )

       const list = await Filmlist.find();
       res.json(list);

}
