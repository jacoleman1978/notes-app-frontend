import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import UserDataService from '../services/userDataService';

const LoginForm = () => {
    // navigate allows redirection to another page when the button is clicked
    const navigate = useNavigate();
    
    // Use state to keep track of info entered into the form
    let [formUserName, setUserName] = useState("");
    let [formPassword, setPassword] = useState("");
    
    // Uses the DataService to attempt to login
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            username: formUserName,
            password: formPassword
        };
        UserDataService.Login(data).then(res => {
            if (res.status === 200) {
                navigate('/notes')
            }
        });
        
    }

    // Redirect to /auth/signup when Create Account button clicked
    const handleCreateAccount = () => {
        navigate('/auth/signup');
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username"
                        onChange={(e) => setUserName(e.target.value)}
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <Button 
                variant="secondary" 
                type="button"
                onClick={handleCreateAccount}
            >
                Create Account
            </Button>

        </div>
    )
}

export default LoginForm;