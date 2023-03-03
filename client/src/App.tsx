
import Container from "react-bootstrap/esm/Container";
import Login from "./pages/Login";
import { Navbar, Nav } from "react-bootstrap";
import Home from "./pages/Home";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Link,
  Route,

} from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { Routes } from "react-router";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import Mymovielistspage from "./pages/Mymovielistspage";
import Movies from "./pages/Movies";

function App() {
  const [user, setUser]: any = useState();
  async function handleLogout() {

    localStorage.removeItem('token');
    setUser(null);


}

  return (
  

    <div className="App">

      <Container>
        <AuthContext.Provider value={{ user, setUser }}>
          <Router>
            <Navbar bg="primary" variant="dark" className="p-2 d-flex justify-content-between">
              { user != null ?
                <Nav>
                  
                  <Nav.Link as={Link} to="/home">Domů</Nav.Link>
                  <Nav.Link as={Link} to="/mymovielists">Mé filmlisty</Nav.Link>
                  <Nav.Link as={Link} to="/movies">Filmy</Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={handleLogout}>Odhlášení</Nav.Link>
                  <Navbar.Text><HiUserCircle/>{user.name}</Navbar.Text>
                </Nav>
                
                : <Nav>
                
                <Nav.Link as={Link} to="/register">Registrace</Nav.Link>
                <Nav.Link as={Link} to="/">Přihlášení</Nav.Link>
              </Nav>}

             
            </Navbar>
            <Routes>
              <Route path="/register" element={<Register></Register>} />
              <Route path="/" element={<Login></Login>} />
              <Route path="/home" element={<Home></Home>} />
              <Route path="/mymovielists" element={<Mymovielistspage></Mymovielistspage>}/>
              <Route path="/movies" element={<Movies></Movies>}/>
            </Routes>

          </Router>
        </AuthContext.Provider>

      </Container>
    </div>
  );
}

export default App;
