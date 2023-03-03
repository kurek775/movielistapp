import { useState, useEffect, useContext } from "react";
import { Card, Form, Button, Accordion } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { HiUser } from "react-icons/hi";
interface AllMovielistsProps {

}

const AllMovielists: React.FC<AllMovielistsProps> = () => {

    // view all movielists saved in our db + you can comment them

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
    async function handleRating(event: React.MouseEvent, id: Number, val: Boolean) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/like', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: {
                    val: val,
                    author: user.name
                },

                id: id
            }),
        })

        const data = await response.json()
        setList(data)
    }

    function displayRat(ratings: Array<any>, rat: boolean) {
        let val: number = 0;
        ratings != undefined
            ? ratings.map((ratings: { val: boolean }) => { ratings.val == rat ? val++ : null })
            : null;

        return val
    }

    function checkRat(ratings: Array<any>, rat: boolean) {
        const current: any = ratings.filter((ratings: { author: string, val: boolean }) => ratings.author == user.name
        )
        current[0] != undefined ? (rat == current[0].val ? rat = true : rat = false) : rat = false
        return rat
    }

    useEffect(() => {

        getMyMovielists();


    }, []);


    return (<div>
        {list != null ? list.map((list: { name: string, _id: number, movies: any, ownerName: string, thread: any, rating: any }) =>
            <Card key={list._id}>
                <Card.Header><h3>{list.name}</h3><p><HiUser /> {list.ownerName}</p>    <div key={list._id}><Button onClick={(e) => handleRating(e, list._id, true)} disabled={checkRat(list.rating, true)} type="submit">
                    {displayRat(list.rating, true)}
                    <FiThumbsUp />
                </Button>
                    <Button onClick={(e) => handleRating(e, list._id, false)} disabled={checkRat(list.rating, false)} type="submit">
                        {displayRat(list.rating, false)}
                        <FiThumbsDown />
                    </Button>
                </div></Card.Header>
                <Card.Body>{list.movies.map((movies: { name: string, url: string, id: number }) => <p key={movies.id}><a href={movies.url}>{movies.name}</a></p>)}



                </Card.Body>
                <Card.Footer>

                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>     Komentáře</Accordion.Header>
                            <Accordion.Body>
                                {list.thread.map((thread: { comment: string, author: string, _id: number }) =>
                                    <div key={thread._id} className="comment">
                                        <p className="comment-text" >{thread.comment}</p>
                                        <p className="comment-author" >{thread.author}</p>
                                    </div>)}

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Form key={list._id} onSubmit={handleClick}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control key={list._id} onChange={(e) => setComment(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Button key={list._id} onClick={(e) => setId(list._id)} disabled={loading} type="submit">
                            Přidat komentář
                        </Button>
                    </Form>


                </Card.Footer>


            </Card>
        ) : null}
    </div>);
}

export default AllMovielists;