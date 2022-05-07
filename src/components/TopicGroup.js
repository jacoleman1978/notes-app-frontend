import React, {useContext, useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NoteDataService from '../services/noteDataService';
import { CurrentUser } from '../contexts/currentUser';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Topic from './Topic';
import TopicForm from './TopicForm';
import ConfirmDeleteTopicMessage from './ConfirmDeleteTopicMessage';
import DeleteTopicButton from './DeleteTopicButton';
import EditTopicButton from './EditTopicButton';

const TopicGroup = (props) => {
    const navigate = useNavigate();

    // Get props
    const {isHome} = props;

    // Get topic and user data from context
    const {topicChildrenArray, parentTopicName, setRefresh, parentTopicId, refresh} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    // State for new topicName
    const [topicName, setTopicName] = useState("");

    // State flags for new, edit and delete forms
    const [showForm, setShowForm] = useState(false);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [deleteTopicId, setDeleteTopicId] = useState("");
    const [confirmDelete, setDeleteConfirmation] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [editTopicFlag, setEditTopicFlag] = useState(false);

    // On click, set the flag to show the new input form
    const handleNewTopicClick = () => {
        setShowForm(true);
    }

    // After confirming that the user does want to delete the topic, delete it and navigate to the parentTopic
    const deleteConfirmationClick = () => {
        NoteDataService.DeleteTopic(currentUser.userName, parentTopicId);
        setDeleteConfirmation(true);
        navigate(-1);
        setRefresh(true);
    }

    // Cancel button was pressed when asked for delete confirmation
    const cancelDelete = () => {
        setDeleteConfirmation(false);
        setDeleteFlag(false);
    }

    useEffect(() => {
        if (confirmDelete) {
            setDeleteFlag(false);
        }
    }, [confirmDelete])

    useEffect(() => {
        if (deleteFlag && parentTopicId === deleteTopicId) {
            setShowDeleteMessage(true);
        } else {
            setShowDeleteMessage(false);
            setRefresh(false);
        }
    }, [deleteFlag, parentTopicId, deleteTopicId, refresh, setRefresh])

    // Component styling
    const topicContainerStyle = {
        padding: "0.75rem",
        borderRadius: "1rem",
        backgroundColor: "#DAD6BA"
    }
    
    const topicGroupStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        alignItems: "center"
    }

    const topicTitleStyle = {
        display: "flex",
        flexWrap: "wrap",
        borderBottom: "black 0.5px solid",
        marginBottom: "0.5rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem"
    }

    const buttonGroupStyle = {
        display: "flex",
        marginLeft: "auto"
    }

    const topicBtnStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "5px",
        height: "2.5rem",
        width: "2.5rem",
        fontSize: "1.75rem"
    }

    const topicList = topicChildrenArray.map((topic) => {
        return (
            <Topic 
                key={topic._id} 
                topicName={topic.topicName} 
                topicId={topic._id}
            />
        )
    })

    return (
        <div style={topicContainerStyle}>
            <div style={topicTitleStyle}>
                <h1>Topic: {parentTopicName}</h1>
                <div style={buttonGroupStyle}>
                    <Button variant="success" style={topicBtnStyle} onClick={handleNewTopicClick}>
                        +
                    </Button>
                    {!isHome ? <DeleteTopicButton topicBtnStyle={topicBtnStyle} setDeleteFlag={setDeleteFlag} setDeleteTopicId={setDeleteTopicId} parentTopicId={parentTopicId} setShowDeleteMessage={setShowDeleteMessage}/> : ""}
                    {!isHome ? <EditTopicButton setEditTopicFlag={setEditTopicFlag} topicBtnStyle={topicBtnStyle}/> : ""}
                </div>


            </div>
            {showForm ? <TopicForm topicName={topicName} setTopicName={setTopicName} setShowForm={setShowForm}/> : ""}

            {editTopicFlag ? <TopicForm topicName={topicName} setTopicName={setTopicName} setEditTopicFlag={setEditTopicFlag} editTopicFlag={editTopicFlag}/> : ""}

            {showDeleteMessage ? <ConfirmDeleteTopicMessage deleteConfirmationClick={deleteConfirmationClick} cancelDelete={cancelDelete}/> : ""}
            <div style={topicGroupStyle}>
                {topicList}
            </div>
        </div>
    )
}

export default TopicGroup;