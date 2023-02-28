import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
interface AllMovielistsProps {

}

const AllMovielists: React.FC<AllMovielistsProps> = () => {


    const [list, setList]: any = useState();



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


    useEffect(() => {

        getMyMovielists();

    }, []);


    return (<div>
        {list != null ?list.map((list: { name: string, _id: number, movies: any }) =>
            <Card key={list._id}>
                <Card.Header>{list.name}</Card.Header>
                <Card.Body>{list.movies}</Card.Body>
            </Card>
        ): null }
    </div>);
}

export default AllMovielists;