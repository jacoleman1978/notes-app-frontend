import {createContext} from 'react';

export const ParentTopicContext = createContext({
    parentTopicId: "",
    userName: "",
    topicName: "",
    topicChildrenArray: [],
    noteChildrenArray: []
})