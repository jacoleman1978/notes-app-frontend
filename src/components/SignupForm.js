import React, {useState, useEffect} from 'react';
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

    // Use state for error checking
    let [errorMessage, setErrorMessage] = useState("");
    let [passwordError, setPasswordError] = useState(false);
    let [userNameError, setUserNameError] = useState(false);
    let [emailError, setEmailError] = useState(false);
    
    // Error message text
    const userNameErrorMessage = "Username Already Taken";
    const emailErrorMessage = "Email Already Linked to An Account";
    const passwordErrorMessage = "Passwords Do Not Match";

    // Use the DataService to submit new user account info
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formPassword === formVerifyPassword) {
            setPasswordError(false)

            let data = {
                firstName: formFirstName,
                lastName: formLastName,
                username: formUserName,
                email: formEmail,
                password: formPassword
            };

            // Verify that email and username are unique
            UserDataService.IsSignupInfoUnique(data).then(res => {
                if (!res.data.isUniqueUserName) {
                    setErrorMessage(userNameErrorMessage);
                } else if (!res.data.isUniqueEmail) {
                    setErrorMessage(emailErrorMessage);
                } else {
                    UserDataService.Signup(data).then(res => {
                        navigate(`/notes/${res.data.userName}`);
                    })
                }
            })
            
        } else {
            setErrorMessage(passwordErrorMessage);
        }
    };

    // Display errorMessage on form if error exists
    useEffect(() => {
        if (errorMessage === userNameErrorMessage) {
            setPasswordError(false);
            setUserNameError(true);
            setEmailError(false);
        } else if (errorMessage === emailErrorMessage) {
            setPasswordError(false);
            setUserNameError(false);
            setEmailError(true);
        } else if (errorMessage === passwordErrorMessage) {
            setPasswordError(true);
            setUserNameError(false);
            setEmailError(false);
        } 
    }, [errorMessage]);

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
                        <Form.Text>
                            {userNameError ? errorMessage : ""}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Form.Text>
                            {emailError ? errorMessage : ""}
                        </Form.Text>
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
                        <Form.Text>
                            {passwordError ? errorMessage : ""}
                        </Form.Text>
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