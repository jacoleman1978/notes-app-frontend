import React, {useContext} from 'react';
import { CurrentUser } from '../contexts/currentUser';

const DisplayContainer = () => {
    // Store current user in Context
    const {currentUser} = useContext(CurrentUser);

    return (
        <>
        <h1>{currentUser._id}</h1>
        </>
    )
}

export default DisplayContainer;