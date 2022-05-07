import React, {useContext} from 'react';
import { CurrentUser } from '../contexts/currentUser';
import {useNavigate} from 'react-router-dom';

const Topic = (props) => {
    // Get props
    const {topicName, topicId} = props;

    // Get currentUser from context
    const {currentUser} = useContext(CurrentUser);

    const navigate = useNavigate();

    // If a topic is clicked on redirect to view of that topic as the parent topic
    const handleTopicClick = (e) => {
        navigate(`/notes/${currentUser.userName}/${topicId}`)
    }

    // Component style
    const topicStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C0BDA7",
        borderRadius: "0.75rem",
        margin: "5px",
        height: "2.5rem",
        width: "14rem"
    }

    return (
        <div style={topicStyle} onClick={handleTopicClick} id={topicId}>
            {topicName}
        </div>
    )
}

export default Topic;