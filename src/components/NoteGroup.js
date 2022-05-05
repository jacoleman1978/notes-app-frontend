import React, {useContext} from 'react';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Note from './Note';

const NoteGroup = () => {
    // Get topic data from context
    const {noteChildrenArray} = useContext(ParentTopicContext);
    
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

    const noteGroupStyle = {
        display: "flex",
        flexDirection: "column",
    }

    return (
        <div style={noteGroupStyle}>
            <ul>
                {noteList}
            </ul>
            
        </div>
    )
}

export default NoteGroup;