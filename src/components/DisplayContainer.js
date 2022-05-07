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
    let [breadcrumbs, setBreadcrumb] = useState({});
    let [refresh, setRefresh] = useState(false);

    // Save state data pulled from database
    const saveTopicData = (res) => {
        let topicData = res.data;
        setParentTopicId(topicData._id);
        setUserName(topicData.userName);
        setParentTopicName(topicData.topicName);
        setTopicChildrenArray(topicData.topicChildrenIds);
        setNoteChildrenArray(topicData.noteChildrenIds);
    }

    useEffect(() => {
        // If there isn't a user in context, check the session data for a user
        if (currentUser === null) {
            UserDataService.CheckSessionUser().then(res => {
                // If no userdata in session redirect to login
                if (res.data === null) {
                    navigate('/auth/login');
                } else {
                    setCurrentUser(res.data)
                }
            })
        }
        
        // Check if in the home directory and user data is present
        if (isHome && currentUser !== undefined && currentUser !== null) {
            // Get topic data for 'Home Directory' topic
            NoteDataService.GetHomeDirectory(currentUser.userName).then(res => {
                if (res.data !== null) {
                    saveTopicData(res);

                    // Add a key-value pair to breadcrumbs in order to prevent duplicate values
                    let newBreadcrumb = {}
                    let newTopicId = res.data._id;
                    let newTopicName = res.data.topicName;
                    newBreadcrumb[newTopicId] = newTopicName;
                    setBreadcrumb(newBreadcrumb);

                    setRefresh(false);
                }
                setRefresh(false);
            })
        } else if (!isHome && currentUser !== null){   
            // If it isn't the 'Home Directory' and user data is present, get topic data 
            NoteDataService.GetTopicsAndNotes(currentUser.userName, topicId).then(res => {
                if (res.data !== null) {
                    saveTopicData(res);

                    // Add a key-value pair to breadcrumbs in order to prevent duplicate values
                    let newBreadcrumb = {}
                    let newTopicId = res.data._id;
                    let newTopicName = res.data.topicName;
                    newBreadcrumb[newTopicId] = newTopicName;
                    setBreadcrumb(breadcrumbs => ({...breadcrumbs, ...newBreadcrumb}));
                    }

                    setRefresh(false);
                }
            )
        } else {
            setRefresh(false);
        }
    }, [currentUser, topicId, isHome, refresh, setCurrentUser, navigate])

    // Component styling
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0.5rem 1rem",
    }

    return (
        <ParentTopicContext.Provider value={{
            parentTopicId: parentTopicId,
            userName: userName,
            parentTopicName: parentTopicName,
            topicChildrenArray: topicChildrenArray,
            noteChildrenArray: noteChildrenArray,
            breadcrumbs: breadcrumbs,
            setBreadcrumb: setBreadcrumb,
            setRefresh: setRefresh,
            refresh: refresh
        }} >
            <div style={containerStyle}>
                <BreadCrumbs />
                <TopicGroup isHome={isHome}/>
                <NoteGroup />
            </div>
        </ParentTopicContext.Provider>
    )
}

export default DisplayContainer;