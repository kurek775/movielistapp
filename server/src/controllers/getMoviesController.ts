import { Request, Response } from "express";
import { csfd } from "node-csfd-api";

export async function getMoviesController(req: Request, res: Response) {
    let dat : any = [];
for (let num: any = 1; num < 30;num++){
    try {
        const mov = await csfd.movie(num);
        dat.push({ title: mov.title, id: mov.id, img: mov.poster, genres: mov.genres, url: mov.url });
        console.log(dat)
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
}
res.json(dat)


}
