// Dependencies
import axios from 'axios';

class UserDataService {
    login = (data) => {
        return axios.get('http://localhost:4343/auth/login', data)
    }

    signup = (data) => {
        return axios.post('http://localhost:4343/auth/signup', data)
    }
}

export default new UserDataService();