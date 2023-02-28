import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useRef, useContext } from 'react'
import {useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
  const {user, setUser}: any = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      navigate('/home')
    } else {
      alert('Please check your username and password')
    }

  }
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">

          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">

      </div>
    </>

  );
}

export default Login;