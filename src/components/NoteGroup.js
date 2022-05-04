import React, {useContext} from 'react';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Note from './Note';

const NoteGroup = () => {
    // Get topic data from context
    const {noteChildrenArray} = useContext(ParentTopicContext);
    
    const noteList = noteChildrenArray.map((note) => {
        return (
            <Note 
                key={note._id} 
                content={note.content} 
                noteId={note._id}
                parentTopicId={note.parentTopicId}
            />
        )
    })

    const noteGroupStyle = {
        display: "flex",
        flexDirection: "column",
    }

    return (
        <div style={noteGroupStyle}>
            {noteList}
        </div>
    )
}

export default NoteGroup;