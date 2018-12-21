import axios from 'axios';

export default class ServiceService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/services`,
            withCredentials: true
        });
        this.service = service;
    }

    getPlaces = (user, place) => {
        return this.service
            .post('/getServices', {
                user,
                place
            })
            .then(response => response.data)
    };

    getServicesFilter = (user, place, filter) => {
        return this.service
            .post('/getServicesFilter', {
                user,
                place,
                filter
            })
            .then(response => response.data)
    }

    newService = (place, name, address, city, type) => {

        return this.service
            .post('/newService', {
                place,
                name,
                address,
                city,
                type
            })
            .then(response => response.data)
    }

    getTypes = (place) => {
        return this.service
            .post('/getTypes', {
                place
            })
            .then(response => response.data)
    }
}