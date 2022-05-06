import React, {useState, useEffect} from 'react';
import ConfirmDeleteNoteMessage from './ConfirmDeleteNoteMessage';

const Note = (props) => {
    const {noteId, deleteNoteId, content, deleteFlag, deleteConfirmationClick, cancelDelete} = props;

    const [showFlag, setShowFlag] = useState(false);

    const textStyle = {
        marginBottom: "0px"
    }

    let noteStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        paddingLeft: "5px",
        border: "1px solid red",
        margin: "5px",
    }

    useEffect(() => {
        if (deleteFlag && noteId === deleteNoteId) {
            setShowFlag(true);
        } else {
            setShowFlag(false);
        }
    }, [deleteFlag, noteId, deleteNoteId, cancelDelete])

    return (
        <div >
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