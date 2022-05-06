import React from 'react';
import {Button} from 'react-bootstrap';

const DeleteNoteButton = (props) => {
    const {noteId, setDeleteFlag, setDeleteNoteId, style} = props;
    
    const handleDelNoteClick = () => {
        setDeleteFlag(true);
        setDeleteNoteId(noteId);
    }
    
    return (
        <Button style={style} variant="danger" onClick={handleDelNoteClick}>
            <i className="fas fa-trash-alt"></i>
        </Button>
    )
}

export default DeleteNoteButton;