import axios from "axios";

export default class AuthService {

    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/auth',
            withCredentials: true
        });
        this.service = service;
    }

    signup = (username, surname, email, password, destination_country, destination_city, origin_country, spoken_languages, rol) => {
        return this.service.post('/signup', {
                username,
                surname,
                email,
                password,
                destination_country,
                destination_city,
                origin_country,
                spoken_languages,
                rol
            })
            .then(response => response.data)
    }

    login = (email, password) => {
        console.log(email, password);
        return this.service.post('/login', {
                email,
                password
            })
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    }

    // logout = () => {
    //     return this.service.get('/logout')
    //         .then(response => response.data)
    // }
}