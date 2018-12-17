import axios from "axios";

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
            .post("/getServices", {
                user,
                place
            })
            .then(response => response.data)
    };


}