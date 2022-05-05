import React, {useContext} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import { CurrentUser } from '../contexts/currentUser';

const NoteForm = (props) => {
    const {content, setContent, setShowForm} = props;

    const {parentTopicId, setRefresh} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.length !== 0) {
            NoteDataService.NewNote(currentUser.userName, parentTopicId, content)
            setShowForm(false);
            setRefresh(true);
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
                <Form.Group sm={8} as={Col} className="mb-3" controlId="formContent">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Note Content"
                        onChange={(e) => setContent(e.target.value)}
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

export default NoteForm;