import React, {useContext, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import { CurrentUser } from '../contexts/currentUser';

const TopicForm = (props) => {
    // Get props
    const {topicName, setTopicName, setShowForm, setEditTopicFlag, editTopicFlag} = props;

    // Get topic and user data from context
    const {parentTopicName, parentTopicId, setRefresh} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    useEffect(() => {
        if (editTopicFlag) {
            setTopicName(parentTopicName);
        } else {
            setTopicName("");
        }
    }, [editTopicFlag, parentTopicName, setTopicName])
    
    // Handle submission of new or edited topic depending on editTopicFlag
    const handleSubmit = (e) => {
        e.preventDefault();
        if (topicName.length !== 0) {
            if (editTopicFlag) {
                NoteDataService.EditTopic(currentUser.username, parentTopicId, topicName)
                setEditTopicFlag(false);
                setRefresh(true);
            } else {
                NoteDataService.NewTopic(currentUser.userName, parentTopicId, topicName)
                setShowForm(false);
                setRefresh(true);
            }
        }
    }

    // Cancel new or edit topic in order to hide the form
    const handleCancel = () => {
        if (editTopicFlag) {
            setEditTopicFlag(false);
        } else {
            setShowForm(false);
        }
    }

    // Component styling
    const rowStyle = {
        marginLeft: "0.25rem"
    }

    const buttonStyle = {
        marginRight: "0.5rem"
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row style={rowStyle}>
                <Form.Group sm={8} as={Col} className="mb-3" controlId="formTopicName">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Topic Name"
                        maxLength="25"
                        onChange={(e) => setTopicName(e.target.value)}
                        required 
                        value={topicName}
                    />
                </Form.Group>
                <Col sm={"4"}>
                    <Button variant="primary" type="submit" style={buttonStyle}>
                        Submit
                    </Button>
                    <Button variant="danger" type="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default TopicForm;