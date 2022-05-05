import React from 'react';
import {Button} from 'react-bootstrap';

const DeleteNoteButton = (props) => {
    const {noteId, setDeleteFlag, setDeleteNoteId} = props;
    
    const handleDelNoteClick = () => {
        setDeleteFlag(true);
        setDeleteNoteId(noteId)
    }

    const noteBtnStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid red",
        margin: "5px",
        height: "2rem",
        width: "2rem",
        fontSize: "1.5rem"
    }
    
    return (
        <Button style={noteBtnStyle} variant="danger" onClick={handleDelNoteClick}>
            <i className="fas fa-trash-alt"></i>
        </Button>
    )
}

export default DeleteNoteButton;