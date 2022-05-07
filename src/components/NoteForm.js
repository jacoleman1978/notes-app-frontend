import React, {useContext, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import { CurrentUser } from '../contexts/currentUser';

const NoteForm = (props) => {
    // Get props
    const {content, editContent, setContent, setShowForm, editFlag, noteId, setEditFlag} = props;

    // Get topic and user data from context
    const {parentTopicId, setRefresh} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    useEffect(() => {
        if (editFlag) {
            setContent(editContent);
        } else {
            setContent("");
        }
    }, [editFlag, editContent, setContent])

    // Handle submission of new or edited note depending on editFlag
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.length !== 0) {
            if (editFlag) {
                await NoteDataService.EditNote(currentUser.userName, parentTopicId, noteId, content)
                setEditFlag(false);
                setRefresh(true);
            } else {
                await NoteDataService.NewNote(currentUser.userName, parentTopicId, content)
                setShowForm(false);
                setRefresh(true);
            }
        }
    }

    // Cancel new or edit note in order to hide the form
    const handleCancel = () => {
        if (editFlag) {
            setEditFlag(false);
        } else {
            setShowForm(false);
        }
    }

    // Component styling
    const formStyle = {
        marginLeft: "1rem",
    }

    const buttonGroupStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        paddingLeft: "0px",
    }

    const inputStyle = {
        bottomMargin: "0px"
    }

    const buttonStyle = {
        marginRight: "0.5rem"
    }

    return (
        <Form onSubmit={handleSubmit} style={formStyle}>
            <Row>
                <Form.Group sm={"8"} as={Col} className="mb-3" controlId="formContent" style={inputStyle}>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Note Content"
                        onChange={(e) => setContent(e.target.value)}
                        required 
                        value={content}
                    />
                </Form.Group>
                <Col sm={"4"} style={buttonGroupStyle}>
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

export default NoteForm;