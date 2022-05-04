import React, {useContext} from 'react';
import { CurrentUser } from '../contexts/currentUser';
import {useNavigate} from 'react-router-dom';

const Note = (props) => {
    const {content, noteId, parentTopicId} = props;

    // Get currentUser from context
    const {currentUser} = useContext(CurrentUser);

    const navigate = useNavigate();

    const handleNoteClick = (e) => {
        navigate(`/notes/${currentUser.userName}/${parentTopicId}/${noteId}`)
    }

    const noteStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid red",
        margin: "5px",
    }

    return (
        <div style={noteStyle} onClick={handleNoteClick} id={noteId}>
            {content}
        </div>
    )
}

export default Note;