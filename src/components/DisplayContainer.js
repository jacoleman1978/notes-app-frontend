import React, {useContext, useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { CurrentUser } from '../contexts/currentUser';
import NoteDataService from '../services/noteDataService';
import UserDataService from '../services/userDataService';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import BreadCrumbs from './BreadCrumbs';
import TopicGroup from './TopicGroup';
import NoteGroup from './NoteGroup';

const DisplayContainer = (props) => {
    // Navigate allows redirection to another page when the button is clicked
    const navigate = useNavigate();
    
    // Get currentUser from context
    const {currentUser, setCurrentUser} = useContext(CurrentUser);

    // Props
    const {isHome} = props;

    // Params
    const {topicId} = useParams();

    // State info related to the parent topic
    let [parentTopicId, setParentTopicId] = useState("");
    let [userName, setUserName] = useState("");
    let [parentTopicName, setParentTopicName] = useState("");
    let [topicChildrenArray, setTopicChildrenArray] = useState([]);
    let [noteChildrenArray, setNoteChildrenArray] = useState([]);
    let [breadcrumbs, setBreadcrumb] = useState([]);
    let [refresh, setRefresh] = useState(false);

    const saveTopicData = (res) => {
        let topicData = res.data;
        setParentTopicId(topicData._id);
        setUserName(topicData.userName);
        setParentTopicName(topicData.topicName);
        setTopicChildrenArray(topicData.topicChildrenIds);
        setNoteChildrenArray(topicData.noteChildrenIds);
    }

    useEffect(() => {
        if (currentUser === null) {
            UserDataService.CheckSessionUser().then(res => {
                if (res.data === null) {
                    navigate('/auth/login');
                } else {
                    setCurrentUser(res.data)
                }
            })
        }
        
        if (isHome && currentUser !== undefined && currentUser !== null) {
            // Get topic data for 'Home Directory' topic
            NoteDataService.GetHomeDirectory(currentUser.userName).then(res => {
                if (res.data !== null) {
                    saveTopicData(res);
                    setBreadcrumb([res.data._id]);
                    setRefresh(false);
                }
                setRefresh(false);
            })
        } else if (!isHome && currentUser !== null){   
            NoteDataService.GetTopicsAndNotes(currentUser.userName, topicId).then(res => {
                if (res.data !== null) {
                    saveTopicData(res);
                    setBreadcrumb(breadcrumbs => [...breadcrumbs, res.data._id]);
                    setRefresh(false);
                }
            })
        } else {
            setRefresh(false);
        }
    }, [currentUser, topicId, isHome, refresh, setCurrentUser, navigate])

    useEffect(() => {
        setBreadcrumb(breadcrumbs => [...new Set(breadcrumbs)])
    }, [topicId])

    return (
        <ParentTopicContext.Provider value={{
            parentTopicId: parentTopicId,
            userName: userName,
            parentTopicName: parentTopicName,
            topicChildrenArray: topicChildrenArray,
            noteChildrenArray: noteChildrenArray,
            breadcrumbs: breadcrumbs,
            setBreadcrumb: setBreadcrumb,
            setRefresh: setRefresh
        }}>
            <BreadCrumbs />
            <TopicGroup isHome={isHome}/>
            <NoteGroup />
        </ParentTopicContext.Provider>
    )
}

export default DisplayContainer;