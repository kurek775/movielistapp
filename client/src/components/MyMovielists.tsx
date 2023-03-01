import { useState, useEffect , useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import Movielist from "./Movielist";


interface MyMovielistsProps {
    movieId: number,
    movieName: string,
    moviePoster: string,
    movieURL: string
}

const MyMovielists: React.FC<MyMovielistsProps> = (MyMovielistsProps) => {

    const [userlist, setUserlist]: any = useState();
    const {user, setUser}: any = useContext(AuthContext);

    async function getMyMovielists() {
       
        
        const response = await fetch('http://localhost:5000/api/filmlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:  user.id
            }),
        })

        const data = await response.json();
        setUserlist(data);
    }


    useEffect(() => {
    
        getMyMovielists();
      
    }, []);

    return (
        <div>
            {userlist != undefined ? userlist.map((list: { name: string , _id: number, movies: any}) =>             
                <Movielist movieName={MyMovielistsProps.movieName} moviePoster={MyMovielistsProps.moviePoster} movieURL={MyMovielistsProps.movieURL} size={list.movies.length} name={list.name} movieId={MyMovielistsProps.movieId} listId={list._id} ></Movielist>
            ) : null}
        </div>);
}

export default MyMovielists;