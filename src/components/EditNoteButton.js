import React from 'react';
import {Button} from 'react-bootstrap';

const EditNoteButton = (props) => {
    const {noteId, setEditFlag, setEditNoteId, style} = props;
    
    const handleEditNoteClick = () => {
        setEditFlag(true);
        setEditNoteId(noteId);
    }
    
    return (
        <Button style={style} variant="primary" onClick={handleEditNoteClick}>
            <i className="far fa-edit"></i>
        </Button>
    )
}

export default EditNoteButton;