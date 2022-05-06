import React, {useContext} from 'react';
import {Button} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';

const DeleteTopicButton = (props) => {
    const {setDeleteFlag, setDeleteTopicId, topicBtnStyle, setShowDeleteMessage} = props;

    const {parentTopicId} = useContext(ParentTopicContext);

    const handleDeleteTopicClick = () => {
        setDeleteFlag(true);
        setDeleteTopicId(parentTopicId);
        setShowDeleteMessage(true);
    }
    return (
        <Button variant="danger" style={topicBtnStyle} onClick={handleDeleteTopicClick}>
            <i className="fas fa-trash-alt"></i>
        </Button>
    )
}

export default DeleteTopicButton;