import { Form, Button, Card } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import jwt_decode from "jwt-decode";
interface CreateMovielistProps {

}

const CreateMovielist: React.FC<CreateMovielistProps> = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const {user, setUser}: any = useContext(AuthContext);



    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
       
        const response = await fetch('http://localhost:5000/api/filmlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                owner: user.iat,
                movies: [],
                thread: []
            }),
        })

        const data = await response.json()
    }





    return (
        <>
            <Card>
                <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="name">
                        <Form.Label>Název filmlistu</Form.Label>
                        <Form.Control type="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                        Vytvořit nový filmlist
                    </Button>
                </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default CreateMovielist;