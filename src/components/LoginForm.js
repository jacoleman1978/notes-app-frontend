import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import UserDataService from '../services/userDataService';
import { CurrentUser } from '../contexts/currentUser';

// Called from App.js
const LoginForm = () => {
    const navigate = useNavigate();

    // Store current user session after successful login
    const {setCurrentUser} = useContext(CurrentUser);
    UserDataService.CheckSessionUser().then(res => setCurrentUser(res.data));
    
    // Use state to keep track of info entered into the form
    let [formUserName, setUserName] = useState("");
    let [formPassword, setPassword] = useState("");

    // Use state for error checking
    let [errorMessage, setErrorMessage] = useState("");
    let [userNameError, setUserNameError] = useState(false);
    let [passwordError, setPasswordError] = useState(false);
    
    // Use the DataService to attempt to login
    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            username: formUserName,
            password: formPassword
        };

        UserDataService.Login(data).then(res => {
            if (res.data.userName.length > 0) {
                // Store user info in context after successful login and redirect to 'Home Directory'
                setCurrentUser(res.data.session);
                navigate(`/notes/${res.data.userName}`);

            } else {
                setErrorMessage(res.data.message);
            } 
        });
    };

    // Display errorMessage on form if error exists
    useEffect(() => {
        if (errorMessage === "Invalid username") {
            setUserNameError(true);
            setPasswordError(false);
        } else if (errorMessage === "Invalid password") {
            setUserNameError(false);
            setPasswordError(true);
        }
    }, [errorMessage]);

    // Redirect to /auth/signup when Create Account button clicked
    const handleCreateAccount = () => {
        navigate('/auth/signup');
    };

    // Component styling
    const formStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 3rem"
    }

    const inputStyle = {
        display: "flex",
        
    }

    const labelStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "0px",
        marginRight: "1rem",
        width: "7rem"
    }

    const buttonGroupStyle = {
        display: "flex",
        justifyContent: "center"
    }

    const buttonStyle = {
        marginRight: "0.5rem"
    }

    return (
        <Form onSubmit={handleSubmit} style={formStyle}>
            <Form.Group className="mb-3" controlId="formUserName">
                <div style={inputStyle}>
                    <Form.Label style={labelStyle}>Username:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username"
                        onChange={(e) => setUserName(e.target.value)}
                        required 
                    />
                </div>

                <Form.Text>
                    {userNameError ? errorMessage : ""}
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <div style={inputStyle}>
                    <Form.Label style={labelStyle}>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <Form.Text>
                    {passwordError ? errorMessage : ""}
                </Form.Text>
            </Form.Group>

            <div style={buttonGroupStyle}>
                <Button variant="primary" type="submit" style={buttonStyle}>
                    Login
                </Button>
                <Button 
                    variant="secondary" 
                    type="button"
                    onClick={handleCreateAccount}
                >
                    Create Account
                </Button>
            </div>

        </Form>
    )
}

export default LoginForm;