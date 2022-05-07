import React, {useState, useEffect} from 'react';
import ConfirmDeleteNoteMessage from './ConfirmDeleteNoteMessage';

const Note = (props) => {
    // Get props
    const {noteId, deleteNoteId, content, deleteFlag, deleteConfirmationClick, cancelDelete} = props;

    // Flag to determine if new note form should be displayed
    const [showFlag, setShowFlag] = useState(false);

    // Component styling
    const textStyle = {
        marginBottom: "0px"
    }

    const containerStyle = {
        width: "100%"
    }

    let noteStyle = {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#C0BDA7",
        borderRadius: "0.5rem",
        justifyContent: "start",
        paddingLeft: "5px",
        margin: "3px",
    }

    useEffect(() => {
        if (deleteFlag && noteId === deleteNoteId) {
            setShowFlag(true);
        } else {
            setShowFlag(false);
        }
    }, [deleteFlag, noteId, deleteNoteId, cancelDelete])

    return (
        <div style={containerStyle}>
            <div style={noteStyle}>
                <p style={textStyle}>
                    {content}
                </p>
            </div>

            {showFlag ? <ConfirmDeleteNoteMessage deleteConfirmationClick={deleteConfirmationClick} cancelDelete={cancelDelete}/> : ""}
        </div>
    )
}

export default Note;