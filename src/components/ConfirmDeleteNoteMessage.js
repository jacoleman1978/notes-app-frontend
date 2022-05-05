import React from 'react';
import {Button} from 'react-bootstrap';

const ConfirmDeleteNoteMessage = (props) => {
    const {deleteConfirmationClick, cancelDelete} = props;
    
    const messageStyle = {

        backgroundColor: "white",
        width: "100%",
        marginLeft: "5px",
        padding: "5px"
    }

    const buttonGroupStyle = {
        display: "flex",
        justifyContent: "center",
    }

    const buttonStyle = {
        margin: "0px 5px"
    }

    return (
        <div style={messageStyle}>
            <h3>Are you sure you want to delete the note above?</h3>
            <div style={buttonGroupStyle}>
                <Button style={buttonStyle} variant="danger" onClick={deleteConfirmationClick}>
                    Confirm Deletion
                </Button>
                <Button variant="success" onClick={cancelDelete}>
                    Cancel Deletion
                </Button>
            </div>
        </div>
    )
}

export default ConfirmDeleteNoteMessage;