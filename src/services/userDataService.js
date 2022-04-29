// Dependencies
import axios from 'axios';

class UserDataService {
    static Login(data) {  
        return axios.post('http://localhost:4343/auth/login', data)
    }

    static Signup(data) {
        return axios.post('http://localhost:4343/auth/signup', data)
    }
}

export default UserDataService;