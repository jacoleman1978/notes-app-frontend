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
    
    const handleNewNoteClick = () => {
        setShowForm(true);
    }

    const listStyle = {
        display: "flex",
        listStyleType: "none"
    }

    const buttonGroupStyle = {
        display: "flex",
        marginLeft: "auto"
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

    const noteList = noteChildrenArray.map((note) => {
        return (
            <li key={note._id} style={listStyle}>
                <Note 
                    content={note.content} 
                    noteId={note._id}
                    parentTopicId={note.parentTopicId}
                />
                <div style={buttonGroupStyle}>
                    <Button style={noteBtnStyle} variant="primary" onClick={handleNewNoteClick}>
                        <i className="far fa-edit"></i>
                    </Button>
                    <Button style={noteBtnStyle} variant="danger" onClick={handleNewNoteClick}>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </div>
            </li>
        )
    })

    const noteGroupStyle = {
        display: "flex",
        flexDirection: "column",
    }

    const noteTitleStyle = {
        display: "flex",
        justifyContent: "center"
    }

    const listGroupStyle = {
        paddingLeft: "0px"
    }

    return (
        <div style={noteGroupStyle}>
            <div style={noteTitleStyle}>
                <h2>Notes</h2>
                <Button style={noteBtnStyle} variant="success"  onClick={handleNewNoteClick}>
                    +
                </Button>

            </div>
            {showForm ? <NoteForm content={content} setContent={setContent} setShowForm={setShowForm}/> : ""}
            <ul style={listGroupStyle}>
                {noteList}
            </ul>

        </div>
    )
}

export default NoteGroup;