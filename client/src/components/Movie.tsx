import { useState, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import MyMovielists from "./MyMovielists";
interface MovieProps {
    id: number;
    title: string;
    img: string;
    genres: any;
    url: string;

}

const Movie: React.FC<MovieProps> = (MovieProps) => {

    // just component for movie with modal that will show my movie lists to 
    // which you can add the movie to

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => setShow(false);
    return (<Card className="movie">
        <Card.Header><h3>{MovieProps.title}</h3>
            {MovieProps.genres.map((genre: string | null | undefined) => <strong>{genre}</strong>)}
        </Card.Header>
        <Card.Body>
            <img src={MovieProps.img}></img>
        </Card.Body>
        <Button onClick={handleShow}>Přidat do filmlistu</Button>
        <Modal key={MovieProps.id} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Do kterého filmlistu chcete film přidat ? </Modal.Title>
            </Modal.Header>
            <Modal.Body><MyMovielists movieName={MovieProps.title} moviePoster={MovieProps.img} movieURL={MovieProps.url} movieId={MovieProps.id}></MyMovielists></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zrušit
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Uložit
                </Button>
            </Modal.Footer>
        </Modal>
    </Card>);
}

export default Movie;