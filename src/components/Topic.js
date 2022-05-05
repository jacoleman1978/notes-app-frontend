import React, {useContext} from 'react';
import { CurrentUser } from '../contexts/currentUser';
import {useNavigate} from 'react-router-dom';

const Topic = (props) => {
    const {topicName, topicId} = props;

    // Get currentUser from context
    const {currentUser} = useContext(CurrentUser);

    const navigate = useNavigate();

    const handleTopicClick = (e) => {
        navigate(`/notes/${currentUser.userName}/${topicId}`)
    }

    const topicStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid red",
        margin: "5px",
        height: "5rem",
        width: "15rem"
    }

    return (
        <div style={topicStyle} onClick={handleTopicClick} id={topicId}>
            {topicName}
        </div>
    )
}

export default Topic;