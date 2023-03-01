import { useState, useEffect } from "react";
import Movie from "../components/Movie";
interface MoviesProps {
    
}
 
const Movies: React.FC<MoviesProps> = () => {

    const [movies, setMovies]: any = useState();

    useEffect(() => {
  

      getMovie();
    }, []);
    async function getMovie() {
      const response = await fetch("http://localhost:5000/api/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      setMovies(data);
    } 
    return ( <div className="d-flex flex-wrap justify-content-center">
  
  {movies != undefined ? movies.map((item: { id: number; title: string; img: string; genres: any; url: string }) =>
          <Movie url={item.url} id={item.id} title={item.title} img={item.img} genres={item.genres}></Movie>

        ) : null
        }
    </div> );
}
 
export default Movies;