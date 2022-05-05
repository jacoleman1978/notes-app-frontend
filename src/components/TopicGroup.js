import React, {useContext, useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Topic from './Topic';
import TopicForm from './TopicForm';

const TopicGroup = () => {
    // Get topic data from context
    const {topicChildrenArray, parentTopicName} = useContext(ParentTopicContext);

    // State for new topic flag
    const [showForm, setShowForm] = useState(false);
    const [topicName, setTopicName] = useState("");

    useEffect(() => {

    }, [topicName])

    const topicList = topicChildrenArray.map((topic) => {
        return (
            <Topic key={topic._id} topicName={topic.topicName} topicId={topic._id}/>
        )
    })

    const handleNewTopicClick = () => {
        setShowForm(true);
    }

    const topicGroupStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    }

    const topicTitleStyle = {
        display: "flex",
        justifyContent: "center"
    }

    const newTopicBtnStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid red",
        margin: "5px",
        height: "2.5rem",
        width: "2.5rem",
        fontSize: "2rem"
    }

    return (
        <div >
            <div style={topicTitleStyle}>
                <h1>Topic: {parentTopicName}</h1>
                    <Button variant="success" style={newTopicBtnStyle} onClick={handleNewTopicClick}>
                        +
                    </Button>
            </div>
            {showForm ? <TopicForm topicName={topicName} setTopicName={setTopicName} setShowForm={setShowForm}/> : ""}
            <div style={topicGroupStyle}>
                {topicList}
            </div>
        </div>
    )
}

export default TopicGroup;