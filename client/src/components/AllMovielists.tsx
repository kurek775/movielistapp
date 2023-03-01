import { useState, useEffect, useContext } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
interface AllMovielistsProps {

}

const AllMovielists: React.FC<AllMovielistsProps> = () => {
    const [id, setId]: any = useState();
    const [comment, setComment] = useState('');
    const [list, setList]: any = useState();
    const [loading, setLoading] = useState(false);
    const { user, setUser }: any = useContext(AuthContext);



    async function getMyMovielists() {


        const response = await fetch('http://localhost:5000/api/filmlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json();
        setList(data);
    }

    async function handleClick(event: React.FormEvent) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/commentfilmlist', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                thread: {
                    comment: comment,
                    author: user.name
                },

                id: id
            }),
        })

        const data = await response.json()
        setList(data)
    }
    useEffect(() => {

        getMyMovielists();

    }, []);


    return (<div>
        {list != null ? list.map((list: { name: string, _id: number, movies: any, ownerName: string, thread: any }) =>
            <Card key={list._id}>
                <Card.Header><h3>{list.name}</h3><p>autor : {list.ownerName}</p></Card.Header>
                <Card.Body>{list.movies.map((movies: { name: string, url: string, id: number }) => <p key={movies.id}><a href={movies.url}>{movies.name}</a></p>)}
                </Card.Body>
                <Card.Footer>
                    <Card.Title>Komentáře</Card.Title>
                    {list.thread.map((thread: { comment: string, author: string, _id: number }) =>
                        <div className="comment" key={thread._id}>
                            <p className="comment-text">{thread.comment}</p>
                            <p className="comment-author">{thread.author}</p>
                        </div>)}
                    <Form key={list._id} onSubmit={handleClick}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control key={list._id} onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Button onClick={(e) => setId(list._id)} disabled={loading} className="w-100" type="submit">
                            Přidat komentář
                        </Button>
                    </Form>
                </Card.Footer>
            </Card>
        ) : null}
    </div>);
}

export default AllMovielists;