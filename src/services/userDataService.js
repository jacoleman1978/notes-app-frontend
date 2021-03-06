// Dependencies
import axios from 'axios';

class UserDataService {
    static Login(data) {  
        axios.defaults.withCredentials = true
        return axios.post('https://notes-app-milestone3.herokuapp.com/auth/login', data)
    }

    static Signup(data) {
        axios.defaults.withCredentials = true
        return axios.post('https://notes-app-milestone3.herokuapp.com/auth/signup', data)
    }

    static IsSignupInfoUnique(data) {
        axios.defaults.withCredentials = true
        return axios.post('https://notes-app-milestone3.herokuapp.com/auth/signup/verify', data)
    }

    static CheckSessionUser() {
        return axios.get('https://notes-app-milestone3.herokuapp.com/auth/session', {withCredentials: true})
    }

    static Logout() {
        return axios.get('https://notes-app-milestone3.herokuapp.com/auth/logout', {withCredentials: true})
    }    
    
    // static Login(data) {  
    //     axios.defaults.withCredentials = true
    //     return axios.post('http://localhost:4343/auth/login', data)
    // }

    // static Signup(data) {
    //     axios.defaults.withCredentials = true
    //     return axios.post('http://localhost:4343/auth/signup', data)
    // }

    // static IsSignupInfoUnique(data) {
    //     axios.defaults.withCredentials = true
    //     return axios.post('http://localhost:4343/auth/signup/verify', data)
    // }

    // static CheckSessionUser() {
    //     return axios.get('http://localhost:4343/auth/session', {withCredentials: true})
    // }

    // static Logout() {
    //     return axios.get('http://localhost:4343/auth/logout', {withCredentials: true})
    // }    
}

export default UserDataService;