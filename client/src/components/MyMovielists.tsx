import { useState, useEffect , useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import Movielist from "./Movielist";


interface MyMovielistsProps {
    movieId: number
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
                id:  user.iat
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
                <Movielist size={list.movies.length} name={list.name} movieId={MyMovielistsProps.movieId} listId={list._id} ></Movielist>
            ) : null}
        </div>);
}

export default MyMovielists;