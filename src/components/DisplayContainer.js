import React, {useContext, useState, useEffect} from 'react';
import { CurrentUser } from '../contexts/currentUser';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import BreadCrumbs from './BreadCrumbs';
import TopicGroup from './TopicGroup';
import NoteGroup from './NoteGroup';

const DisplayContainer = () => {
    // Get currentUser from context
    const {currentUser} = useContext(CurrentUser);

    // State info related to the parent topic
    let [parentTopicId, setParentTopicId] = useState("");
    let [userName, setUserName] = useState("");
    let [topicName, setTopicName] = useState("");
    let [topicChildrenArray, setTopicChildrenArray] = useState([]);
    let [noteChildrenArray, setNoteChildrenArray] = useState([]);

    // Get topic data for 'Home Directory' topic
    NoteDataService.GetHomeDirectory(currentUser.userName).then(
    res => {
        let topicData = res.data;
        console.log(topicData)
        setParentTopicId(topicData._id);
        setUserName(topicData.userName);
        setTopicName(topicData.topicName);
        setTopicChildrenArray(...topicData.topicChildrenIds);
        setNoteChildrenArray(...topicData.noteChildrenIds);
    })

    return (
        <ParentTopicContext.Provider value={{
            parentTopicId: parentTopicId,
            userName: userName,
            topicName: topicName,
            topicChildrenArray: topicChildrenArray,
            noteChildrenArray: noteChildrenArray
        }}>
            <BreadCrumbs />
            <h1>{topicName}</h1>
            <TopicGroup />
            <NoteGroup />
        </ParentTopicContext.Provider>
    )
}

export default DisplayContainer;