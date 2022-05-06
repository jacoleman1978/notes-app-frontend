import React from 'react';
import {Button} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';

const TopicButtonGroup = (props) => {
    const {setDeleteFlag, setDeleteTopicId, topicBtnStyle, handleEditTopicClick, setShowDeleteMessage} = props;

    const handleDeleteTopicClick = () => {
        setDeleteFlag(true);
        setDeleteTopicId(ParentTopicContext);
        setShowDeleteMessage(true);
    }
    return (
        <>
            <Button variant="primary" style={topicBtnStyle} onClick={handleEditTopicClick}>
                <i className="far fa-edit"></i>
            </Button>
            <Button variant="danger" style={topicBtnStyle} onClick={handleDeleteTopicClick}>
                <i className="fas fa-trash-alt"></i>
            </Button>
        </>
    )
}

export default TopicButtonGroup;