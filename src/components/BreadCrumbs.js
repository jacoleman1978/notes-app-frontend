import React, {useContext} from 'react';
import { CurrentUser } from '../contexts/currentUser';
import {Breadcrumb} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';

const BreadCrumbs = () => {
    // Get currentUser from context
    const {breadcrumbs} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    let breadcrumbList = Object.entries(breadcrumbs)

    let lastIndex = breadcrumbList.length - 1;

    const breadcrumbMap = breadcrumbList.map((topicSet, index) => {
        
        if (index === lastIndex) {
            return (
                <Breadcrumb.Item 
                    key={index} 
                    active
                >
                    {topicSet[1]}
                </Breadcrumb.Item>
            )
        } else {
            return (
                <Breadcrumb.Item 
                    key={index} 
                    href={`/notes/${currentUser.userName}/${topicSet[0]}`}
                >
                    {topicSet[1]}
                </Breadcrumb.Item>
            )
        }
    })

    // Component styling
    const containerStyle = {
        padding: "0.5rem 0rem",
    }

    return (
        <div style={containerStyle}>
            <Breadcrumb >
                {breadcrumbMap}
            </Breadcrumb>
            <hr/>
        </div>
        

    )
}

export default BreadCrumbs;