import { Card, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react'
import { IoMdCreate } from "react-icons/io";
interface RegisterProps {
    
}
 
const Register: React.FC<RegisterProps> = () => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    async function handleSubmit(event: React.FormEvent) {
		event.preventDefault()

        const response = await fetch('http://localhost:5000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

	}

    return (  <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Registrace</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
                <Form.Label>Jméno</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Heslo</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
         
              <Button disabled={loading} type="submit">
                Registruj se <IoMdCreate/>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      
      </>  );
}
 
export default Register;