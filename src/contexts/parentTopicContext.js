import {createContext} from 'react';

export const ParentTopicContext = createContext({
    parentTopicId: "",
    userName: "",
    parentTopicName: "",
    topicChildrenArray: [],
    noteChildrenArray: [],
    breadcrumbs: []
})