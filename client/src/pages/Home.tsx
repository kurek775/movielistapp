import { Card } from 'react-bootstrap';
import Movie from "../components/Movie";
import { useState, useEffect, useContext } from "react";
import CreateMovielist from "../components/CreateMovielist";
import { AuthContext } from '../context/AuthContext';
import jwt_decode from "jwt-decode";
import AllMovielists from '../components/AllMovielists';
interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    const {user, setUser}: any = useContext(AuthContext);
    useEffect(() => {
        const token: any = localStorage.getItem('token');
        setUser(jwt_decode(token));
    }, []);

  console.log(user);


    return (<>
    
       <AllMovielists></AllMovielists>

    </>);
}

export default Home;