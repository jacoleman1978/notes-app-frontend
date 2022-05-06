import React, {useContext, useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NoteDataService from '../services/noteDataService';
import { CurrentUser } from '../contexts/currentUser';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Topic from './Topic';
import TopicForm from './TopicForm';
import TopicButtonGroup from './TopicButtonGroup';
import ConfirmDeleteTopicMessage from './ConfirmDeleteTopicMessage';

const TopicGroup = (props) => {
    const {isHome} = props;

    const navigate = useNavigate();

    // Get topic data from context
    const {topicChildrenArray, parentTopicName, setRefresh, parentTopicId} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    // State for new topic flag
    const [showForm, setShowForm] = useState(false);
    const [topicName, setTopicName] = useState("");
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [deleteTopicId, setDeleteTopicId] = useState("");
    const [confirmDelete, setDeleteConfirmation] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const handleNewTopicClick = () => {
        setShowForm(true);
    }

    const deleteConfirmationClick = () => {
        NoteDataService.DeleteTopic(currentUser.userName, parentTopicId);
        setDeleteConfirmation(true);
        navigate(-1);
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

    useEffect(() => {
        if (deleteFlag && parentTopicId === deleteTopicId) {
            setShowDeleteMessage(true);
        } else {
            setShowDeleteMessage(false);
        }
    }, [deleteFlag, parentTopicId, deleteTopicId])

    const handleEditTopicClick = () => {

    }

    const topicGroupStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        alignItems: "center"
    }

    const topicTitleStyle = {
        display: "flex",
        justifyContent: "center"
    }

    const topicBtnStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid red",
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
        <div>
            <div style={topicTitleStyle}>
                <h1>Topic: {parentTopicName}</h1>
                <Button variant="success" style={topicBtnStyle} onClick={handleNewTopicClick}>
                    +
                </Button>
                {!isHome ? <TopicButtonGroup handleEditTopicClick={handleEditTopicClick} topicBtnStyle={topicBtnStyle} setDeleteFlag={setDeleteFlag} setDeleteTopicId={setDeleteTopicId} parentTopicId={parentTopicId} setShowDeleteMessage={setShowDeleteMessage}/> : ""}
            </div>
            {showForm ? <TopicForm topicName={topicName} setTopicName={setTopicName} setShowForm={setShowForm}/> : ""}

            {showDeleteMessage ? <ConfirmDeleteTopicMessage deleteConfirmationClick={deleteConfirmationClick} cancelDelete={cancelDelete}/> : ""}
            <div style={topicGroupStyle}>
                {topicList}
            </div>
        </div>
    )
}

export default TopicGroup;