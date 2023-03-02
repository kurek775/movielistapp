import { Request, Response } from "express";
import Filmlist from "../models/Filmlist";

export async function addLikeController(req: Request, res: Response) {
  const filmlist = await Filmlist.findById(req.body.id);
  const test: any = filmlist?.rating.filter(
    (rating: { author: string; val: boolean }) =>
      rating.author == req.body.rating.author
  );

  if (test != "") {
    const update = await Filmlist.updateOne(
      {
        _id: req.body.id,
        rating: { $elemMatch: { author: req.body.rating.author } },
      },
      { $set: { "rating.$.val": req.body.rating.val } }
    );
  } else {
    const filmlists = await Filmlist.findByIdAndUpdate(req.body.id, {
      $push: {
        rating: {
          $each: [req.body.rating],
        },
      },
    });
  }

  const list = await Filmlist.find();
  res.json(list);
}
