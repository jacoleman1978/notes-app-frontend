import React from 'react';
import {Button} from 'react-bootstrap';

const EditTopicButton = (props) => {
    const {setEditTopicFlag, topicBtnStyle} = props;
    
    const handleEditTopicClick = () => {
        setEditTopicFlag(true);
    }
    
    return (
        <Button style={topicBtnStyle} variant="primary" onClick={handleEditTopicClick}>
            <i className="far fa-edit"></i>
        </Button>
    )
}

export default EditTopicButton;