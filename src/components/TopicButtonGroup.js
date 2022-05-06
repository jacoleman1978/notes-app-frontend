import React, {useContext} from 'react';
import {Button} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';
import EditTopicButton from './EditTopicButton';

const TopicButtonGroup = (props) => {
    const {setDeleteFlag, setDeleteTopicId, topicBtnStyle, setShowDeleteMessage} = props;

    const {parentTopicId} = useContext(ParentTopicContext);

    const handleDeleteTopicClick = () => {
        setDeleteFlag(true);
        setDeleteTopicId(parentTopicId);
        setShowDeleteMessage(true);
    }
    return (
        <>
            <EditTopicButton style={topicBtnStyle}/>
            <Button variant="danger" style={topicBtnStyle} onClick={handleDeleteTopicClick}>
                <i className="fas fa-trash-alt"></i>
            </Button>
        </>
    )
}

export default TopicButtonGroup;