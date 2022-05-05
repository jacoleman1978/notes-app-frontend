import React, {useContext, useEffect} from 'react';
import { CurrentUser } from '../contexts/currentUser';
import {Breadcrumb} from 'react-bootstrap';
import { ParentTopicContext } from '../contexts/parentTopicContext';

const BreadCrumbs = () => {
    // Get currentUser from context
    const {parentTopicId, breadcrumbs, setBreadcrumb} = useContext(ParentTopicContext);
    const {currentUser} = useContext(CurrentUser);

    useEffect(() => {
        setBreadcrumb(breadcrumbs => [...new Set(breadcrumbs)])
    }, [setBreadcrumb, parentTopicId])

    const lastBreadcrumbIndex = breadcrumbs.length - 1;

    const breadcrumbStyle = {
        color: "purple"
    }

    const breadcrumbList = breadcrumbs.map((topicId, index) => {
        
        if (index === lastBreadcrumbIndex) {
            return (
                <Breadcrumb.Item 
                    key={index} 
                    active
                >
                    {topicId}
                </Breadcrumb.Item>
            )
        } else {
            return (
                <Breadcrumb.Item 
                    key={index} 
                    href={`/notes/${currentUser.userName}/${topicId}`}
                >
                    {topicId}
                </Breadcrumb.Item>
            )
        }
    })

    return (
        <Breadcrumb style={breadcrumbStyle}>
            {breadcrumbList}
        </Breadcrumb>
    )
}

export default BreadCrumbs;