import React, {useContext} from 'react';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import Topic from './Topic';

const TopicGroup = () => {
    // Get topic data from context
    const {topicChildrenArray} = useContext(ParentTopicContext);
    
    const topicList = topicChildrenArray.map((topic) => {
        return (
            <Topic key={topic._id} topicName={topic.topicName} topicId={topic._id}/>
        )
    })

    const topicGroupStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div style={topicGroupStyle}>
            {topicList}
        </div>
    )
}

export default TopicGroup;