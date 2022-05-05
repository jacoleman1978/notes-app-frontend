import React, {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { CurrentUser } from '../contexts/currentUser';
import NoteDataService from '../services/noteDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import BreadCrumbs from './BreadCrumbs';
import TopicGroup from './TopicGroup';
import NoteGroup from './NoteGroup';

const DisplayContainer = (props) => {
    // Get currentUser from context
    const {currentUser} = useContext(CurrentUser);

    // Props
    const {isHome} = props;

    // Params
    const {topicId} = useParams();

    // State info related to the parent topic
    let [parentTopicId, setParentTopicId] = useState("");
    let [userName, setUserName] = useState("");
    let [topicName, setTopicName] = useState("");
    let [topicChildrenArray, setTopicChildrenArray] = useState([]);
    let [noteChildrenArray, setNoteChildrenArray] = useState([]);
    let [breadcrumbs, setBreadcrumb] = useState([]);

    const saveTopicData = (res) => {
        let topicData = res.data;
        setParentTopicId(topicData._id);
        setUserName(topicData.userName);
        setTopicName(topicData.topicName);
        setTopicChildrenArray(topicData.topicChildrenIds);
        setNoteChildrenArray(topicData.noteChildrenIds);
    }

    useEffect(() => {
        if (isHome) {
            // Get topic data for 'Home Directory' topic
            NoteDataService.GetHomeDirectory(currentUser.userName).then(res => {
                saveTopicData(res);
                setBreadcrumb([res.data._id]);
            })
        } else {
            NoteDataService.GetTopicsAndNotes(currentUser.userName, topicId).then(res => {
                saveTopicData(res);
                setBreadcrumb(breadcrumbs => [...breadcrumbs, res.data._id])
            })
        }
    }, [currentUser, topicId, isHome])

    useEffect(() => {
        setBreadcrumb(breadcrumbs => [...new Set(breadcrumbs)])
    }, [topicId])

    return (
        <ParentTopicContext.Provider value={{
            parentTopicId: parentTopicId,
            userName: userName,
            topicName: topicName,
            topicChildrenArray: topicChildrenArray,
            noteChildrenArray: noteChildrenArray,
            breadcrumbs: breadcrumbs,
            setBreadcrumb: setBreadcrumb
        }}>
            <BreadCrumbs />
            <h1>Current Topic: {topicName}</h1>
            <TopicGroup />
            <NoteGroup />
        </ParentTopicContext.Provider>
    )
}

export default DisplayContainer;