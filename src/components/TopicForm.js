import React, {useContext} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import { CurrentUser } from '../contexts/currentUser';

const TopicForm = (props) => {
    const {topicName, setTopicName, setShowForm} = props;

    const {parentTopicId} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (topicName.length !== 0) {
            NoteDataService.NewTopic(currentUser.userName, parentTopicId, topicName)
            setShowForm(false);
        }
    }

    const handleCancel = () => {
        setShowForm(false);
    }

    const rowStyle = {
        marginLeft: "1.7rem"
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row style={rowStyle}>
                <Form.Group sm={8} as={Col} className="mb-3" controlId="formTopicName">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Topic Name"
                        onChange={(e) => setTopicName(e.target.value)}
                        required 
                    />
                </Form.Group>
                <Col sm={"4"}>
                    <Button variant="primary" type="submit">
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