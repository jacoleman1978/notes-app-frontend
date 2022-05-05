import React, {useContext, useState} from 'react';
import {Button} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Note from './Note';
import NoteForm from './NoteForm';

const NoteGroup = () => {
    // Get topic data from context
    const {noteChildrenArray} = useContext(ParentTopicContext);

    // State for new note flag
    const [showForm, setShowForm] = useState(false);
    const [content, setContent] = useState("");
    
    const noteList = noteChildrenArray.map((note) => {
        return (
            <li key={note._id} >
                <Note 
                    content={note.content} 
                    noteId={note._id}
                    parentTopicId={note.parentTopicId}
                />
            </li>
        )
    })

    const handleNewNoteClick = () => {
        setShowForm(true);
    }

    const noteGroupStyle = {
        display: "flex",
        flexDirection: "column",
    }

    const noteTitleStyle = {
        display: "flex",
        justifyContent: "center"
    }

    const newNoteBtnStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid red",
        margin: "5px",
        height: "2rem",
        width: "2rem",
        fontSize: "2rem"
    }

    return (
        <div style={noteGroupStyle}>
            <div style={noteTitleStyle}>
                <h2>Notes</h2>
                <Button style={newNoteBtnStyle} variant="success"  onClick={handleNewNoteClick}>
                    +
                </Button>
            </div>
            {showForm ? <NoteForm content={content} setContent={setContent} setShowForm={setShowForm}/> : ""}
            <ul>
                {noteList}
            </ul>

        </div>
    )
}

export default NoteGroup;