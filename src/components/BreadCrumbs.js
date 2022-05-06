import React, {useContext} from 'react';
import { CurrentUser } from '../contexts/currentUser';
import {Breadcrumb} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';

const BreadCrumbs = () => {
    // Get currentUser from context
    const {breadcrumbs} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    const breadcrumbStyle = {
        color: "purple"
    }

    console.log(breadcrumbs)

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

    

    return (
        <Breadcrumb style={breadcrumbStyle}>
            {breadcrumbMap}
        </Breadcrumb>
    )
}

export default BreadCrumbs;