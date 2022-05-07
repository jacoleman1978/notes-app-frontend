// Dependencies
import axios from 'axios';

class NoteDataService {
    static NewTopic(userName, parentTopicId, topicName) {
        axios.defaults.withCredentials = true;
        return axios.post(`https://notes-app-milestone3.herokuapp.com/notes/${userName}/${parentTopicId}/new/topic`, {topicName: topicName})
    }

    static GetHomeDirectory(userName) {
        axios.defaults.withCredentials = true;
        return axios.get(`https://notes-app-milestone3.herokuapp.com/notes/${userName}`)
    }

    static GetTopicsAndNotes(userName, topicId) {
        axios.defaults.withCredentials = true;
        return axios.get(`https://notes-app-milestone3.herokuapp.com/notes/${userName}/${topicId}`)
    }

    static EditTopic(userName, topicId, topicName) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://notes-app-milestone3.herokuapp.com/notes/${userName}/${topicId}`, {topicName: topicName})
    }

    static DeleteTopic(userName, topicId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`https://notes-app-milestone3.herokuapp.com/notes/${userName}/${topicId}`)
    }

    static NewNote(userName, parentTopicId, content) {
        axios.defaults.withCredentials = true;
        return axios.post(`https://notes-app-milestone3.herokuapp.com/notes/${userName}/${parentTopicId}/new/note`, {content: content})
    }

    static EditNote(userName, parentTopicId, noteId, content) {
        axios.defaults.withCredentials = true;
        return axios.put(`https://notes-app-milestone3.herokuapp.com/notes/${userName}/${parentTopicId}/${noteId}`, {content: content})
    }

    static DeleteNote(userName, parentTopicId, noteId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`https://notes-app-milestone3.herokuapp.com/notes/${userName}/${parentTopicId}/${noteId}`)
    }
}

//     static NewTopic(userName, parentTopicId, topicName) {
//         axios.defaults.withCredentials = true;
//         return axios.post(`http://localhost:4343/notes/${userName}/${parentTopicId}/new/topic`, {topicName: topicName})
//     }

//     static GetHomeDirectory(userName) {
//         axios.defaults.withCredentials = true;
//         return axios.get(`http://localhost:4343/notes/${userName}`)
//     }

//     static GetTopicsAndNotes(userName, topicId) {
//         axios.defaults.withCredentials = true;
//         return axios.get(`http://localhost:4343/notes/${userName}/${topicId}`)
//     }

//     static EditTopic(userName, topicId, topicName) {
//         axios.defaults.withCredentials = true;
//         return axios.put(`http://localhost:4343/notes/${userName}/${topicId}`, {topicName: topicName})
//     }

//     static DeleteTopic(userName, topicId) {
//         axios.defaults.withCredentials = true;
//         return axios.delete(`http://localhost:4343/notes/${userName}/${topicId}`)
//     }

//     static NewNote(userName, parentTopicId, content) {
//         axios.defaults.withCredentials = true;
//         return axios.post(`http://localhost:4343/notes/${userName}/${parentTopicId}/new/note`, {content: content})
//     }

//     static EditNote(userName, parentTopicId, noteId, content) {
//         axios.defaults.withCredentials = true;
//         return axios.put(`http://localhost:4343/notes/${userName}/${parentTopicId}/${noteId}`, {content: content})
//     }

//     static DeleteNote(userName, parentTopicId, noteId) {
//         axios.defaults.withCredentials = true;
//         return axios.delete(`http://localhost:4343/notes/${userName}/${parentTopicId}/${noteId}`)
//     }
// }

export default NoteDataService;