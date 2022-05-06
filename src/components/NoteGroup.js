import React, {useContext, useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import NoteDataService from '../services/noteDataService';
import { CurrentUser } from '../contexts/currentUser';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Note from './Note';
import NoteForm from './NoteForm';
import DeleteNoteButton from './DeleteNoteButton';
import EditNoteButton from './EditNoteButton';

const NoteGroup = () => {
    // Get topic data from context
    const {noteChildrenArray, parentTopicId, setRefresh} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    // State for new note flag
    const [showForm, setShowForm] = useState(false);
    const [content, setContent] = useState("");
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [deleteNoteId, setDeleteNoteId] = useState("");
    const [confirmDelete, setDeleteConfirmation] = useState(false);
    const [editFlag, setEditFlag] = useState(false);
    const [editNoteId, setEditNoteId] = useState("");
    const [displayNoteButtons, setDisplayNoteButtons] = useState(false);
    
    const handleNewNoteClick = () => {
        setShowForm(true);
    }

    const deleteConfirmationClick = () => {
        NoteDataService.DeleteNote(currentUser.userName, parentTopicId, deleteNoteId);
        setDeleteConfirmation(true);
        setRefresh(true);
    }

    const cancelDelete = () => {
        setDeleteConfirmation(false);
        setDeleteFlag(false);
    }

    useEffect(() => {
        if (confirmDelete) {
            setDeleteFlag(false);
        }
    }, [confirmDelete])

    const listStyle = {
        display: "flex",
        listStyleType: "none",
        flexDirection: "column"
    }

    const noteLineStyle = {
        display: "flex",
    }

    const noteBtnStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid red",
        margin: "5px",
        height: "1.6rem",
        width: "1.6rem",
        fontSize: "1.1rem"
    }

    const noteList = noteChildrenArray.map((note) => {
        return (
            <li key={note._id} style={listStyle}>
                <div style={noteLineStyle}>
                    {displayNoteButtons ? <EditNoteButton style={noteBtnStyle} noteId={note._id} setEditFlag={setEditFlag} setEditNoteId={setEditNoteId}/> : ""}
                    
                    {displayNoteButtons ? <DeleteNoteButton style={noteBtnStyle} noteId={note._id} setDeleteFlag={setDeleteFlag} setDeleteNoteId={setDeleteNoteId}/> : ""}
                    
                    <Note 
                        content={note.content} 
                        noteId={note._id}
                        deleteFlag={deleteFlag}
                        deleteConfirmationClick={deleteConfirmationClick}
                        cancelDelete={cancelDelete}
                        deleteNoteId={deleteNoteId}
                    />
                </div>
                {editFlag && note._id === editNoteId ? <NoteForm content={content} editContent={note.content} setContent={setContent} editFlag={editFlag} noteId={note._id} setEditFlag={setEditFlag}/> : ""}
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

    const checkboxStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5rem"
    }

    const notesTitleStyle = {
        marginBottom: "0px"
    }

    const boxStyle = {
        marginRight: "0.5rem"
    }

    const displayCheckboxFlag = () => {
        setDisplayNoteButtons(!displayNoteButtons);
    }

    return (
        <div style={noteGroupStyle}>
            <div style={noteTitleStyle}>
                <h2 style={notesTitleStyle}>Notes</h2>
                <Button style={noteBtnStyle} variant="success" onClick={handleNewNoteClick}>
                    +
                </Button>
                <div style={checkboxStyle}>
                    <input style={boxStyle} id="editNotes" onChange={displayCheckboxFlag} type="checkbox" />
                    <label htmlFor="editNotes">Edit Notes</label>
                </div>
            </div>
            {showForm ? <NoteForm content={content} setContent={setContent} setShowForm={setShowForm}/> : ""}
            <ul style={listGroupStyle}>
                {noteList}
            </ul>

        </div>
    )
}

export default NoteGroup;