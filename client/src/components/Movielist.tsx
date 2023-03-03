import { Button, Card, Modal } from "react-bootstrap";
import { HiOutlinePlus } from "react-icons/hi";
import { useState } from "react";
interface MovielistProps {
    name: string;
    movieId: number;
    movieName: string;
    movieURL: string;
    moviePoster: string;
    listId: number;
    size: number;
    viewmode: boolean;
    movie: any;
}

const Movielist: React.FC<MovielistProps> = (MovielistProps) => {

    const [list, setList]: any = useState();
    // movielist that is viewed in modal that is in Movie.tsx
    async function handleClick() {


        const response = await fetch('http://localhost:5000/api/filmlist', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                movie: {
                    id: MovielistProps.movieId,
                    name: MovielistProps.movieName,
                    url: MovielistProps.movieURL,
                    img: MovielistProps.moviePoster


                },
                id: MovielistProps.listId

            }),
        })

        const data = await response.json()

    }

    function checkMov() {
        let contains: boolean = true;

        let check: any = MovielistProps.movie.filter((movie: { id: number }) => movie.id == MovielistProps.movieId)

        check != "" ? contains = false : contains = true
        return contains
    }
    return (
        <Card>
            <Card.Header>{MovielistProps.name}</Card.Header>
            {MovielistProps.viewmode == true ? <Card.Body>
                {MovielistProps != undefined ? MovielistProps.movie.map((movie: { name: string, id: number }) => <p key={movie.id}>{movie.name}</p>) : null}
            </Card.Body> : <Card.Body>{MovielistProps.size != 10 || checkMov() ?
                <Button onClick={handleClick}><HiOutlinePlus /></Button> :
                <strong>List už je plný nebo v něm daný film už je</strong>
            }</Card.Body>}

        </Card>
    );
}

export default Movielist;