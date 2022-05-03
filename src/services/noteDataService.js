// Dependencies
import axios from 'axios';

class NoteDataService {
    static NewTopic(userName, parentTopicId, topicName) {
        axios.defaults.withCredentials = true;
        return axios.post(`http://localhost:4343/notes/${userName}/${parentTopicId}/new/topic`, topicName)
    }

    static GetHomeDirectory(userName) {
        axios.defaults.withCredentials = true;
        return axios.get(`http://localhost:4343/notes/${userName}`)
    }

    static GetTopicsAndNotes(userName, topicId) {
        axios.defaults.withCredentials = true;
        return axios.get(`http://localhost:4343/notes/${userName}/${topicId}`)
    }

    static EditTopic(userName, topicId, topicName) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:4343/notes/${userName}/${topicId}`, topicName)
    }

    static DeleteTopic(userName, topicId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`http://localhost:4343/notes/${userName}/${topicId}`)
    }

    static NewNote(userName, parentTopicId, content) {
        axios.defaults.withCredentials = true;
        return axios.post(`http://localhost:4343/notes/${userName}/${parentTopicId}/new/note`, content)
    }

    static EditNote(userName, parentTopicId, noteId, content) {
        axios.defaults.withCredentials = true;
        return axios.put(`http://localhost:4343/notes/${userName}/${parentTopicId}/${noteId}`, content)
    }

    static DeleteNote(userName, parentTopicId, noteId) {
        axios.defaults.withCredentials = true;
        return axios.delete(`http://localhost:4343/notes/${userName}/${parentTopicId}/${noteId}`)
    }
}

export default NoteDataService;