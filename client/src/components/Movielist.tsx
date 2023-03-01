import { Button, Card, Modal } from "react-bootstrap";
interface MovielistProps {
    name: string;
    movieId: number;
    movieName: string;
    movieURL: string;
    moviePoster: string;
    listId: number;
    size: number;
}

const Movielist: React.FC<MovielistProps> = (MovielistProps) => {
    async function handleClick() {


        const response = await fetch('http://localhost:5000/api/filmlist', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                movie: {
                    id:MovielistProps.movieId,
                    name:MovielistProps.movieName,
                    url:MovielistProps.movieURL,
                    img:MovielistProps.moviePoster
                    
                
                },
                id: MovielistProps.listId

            }),
        })

        const data = await response.json()
    }
    return (
        <Card>
            <Card.Header>{MovielistProps.name}</Card.Header>
            <Card.Body>{MovielistProps.size != 10 ?
                <Button onClick={handleClick}>Přidat</Button> :
                <strong>List už je plný</strong>
            }</Card.Body>
        </Card>
    );
}

export default Movielist;