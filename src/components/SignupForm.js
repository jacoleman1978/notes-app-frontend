import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import UserDataService from '../services/userDataService';

const SignupForm = () => {
    // Navigate allows redirection to another page when the form is submitted
    const navigate = useNavigate();

    // Use state to keep track of info entered into the form
    let [formFirstName, setFirstName] = useState("");
    let [formLastName, setLastName] = useState("");
    let [formUserName, setUserName] = useState("");
    let [formEmail, setEmail] = useState("");
    let [formPassword, setPassword] = useState("");
    let [formVerifyPassword, setVerifyPassword] = useState("");

    // Use the DataService to submit new user account info
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            firstName: formFirstName,
            lastName: formLastName,
            username: formUserName,
            email: formEmail,
            password: formPassword
        };
        UserDataService.Signup(data).then(res => {
            // TODO: Need to add logic
        });
    };

    // Redirect to /auth/login when Back to Login button clicked
    const handleBackToLogin = () => {
        navigate('/auth/login');
    };

    return (
        <div>
            <Button 
                type="button"
                variant="secondary"
                onClick={handleBackToLogin}
            >
                Back to Login
            </Button>
            
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter Username"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formVerifyPassword">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Verify Password"
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    )
}

export default SignupForm;