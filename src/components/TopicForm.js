import React, {useContext, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import { CurrentUser } from '../contexts/currentUser';

const TopicForm = (props) => {
    const {topicName, setTopicName, setShowForm, setEditTopicFlag, editTopicFlag} = props;

    const {parentTopicName, parentTopicId, setRefresh} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    useEffect(() => {
        if (editTopicFlag) {
            setTopicName(parentTopicName);
        } else {
            setTopicName("");
        }
    }, [editTopicFlag, parentTopicName, setTopicName])
    
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

    const handleCancel = () => {
        if (editTopicFlag) {
            setEditTopicFlag(false);
        } else {
            setShowForm(false);
        }
        
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
                        value={topicName}
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