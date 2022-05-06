import React, {useContext, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import { CurrentUser } from '../contexts/currentUser';

const NoteForm = (props) => {
    const {content, editContent, setContent, setShowForm, editFlag, noteId, setEditFlag} = props;

    const {parentTopicId, setRefresh} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    useEffect(() => {
        if (editFlag) {
            setContent(editContent);
        } else {
            setContent("");
        }
    }, [editFlag, editContent, setContent])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.length !== 0) {
            if (editFlag) {
                NoteDataService.EditNote(currentUser.userName, parentTopicId, noteId, content)
                setEditFlag(false);
                setRefresh(true);
            } else {
                NoteDataService.NewNote(currentUser.userName, parentTopicId, content)
                setShowForm(false);
                setRefresh(true);
            }
        }
    }

    const handleCancel = () => {
        if (editFlag) {
            setEditFlag(false);
        } else {
            setShowForm(false);
        }
    }

    const formStyle = {
        marginLeft: "4.65rem"
    }

    const buttonGroupStyle = {
        display: "flex",
        alignItems: "start",
        paddingLeft: "0px",
    }

    const inputStyle = {
        bottomMargin: "0px"
    }

    return (
        <Form onSubmit={handleSubmit} style={formStyle}>
            <Row>
                <Form.Group sm={8} as={Col} className="mb-3" controlId="formContent" style={inputStyle}>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Note Content"
                        onChange={(e) => setContent(e.target.value)}
                        required 
                        value={content}
                    />
                </Form.Group>
                <Col sm={"4"} style={buttonGroupStyle}>
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