import axios from "axios";

export default class ServiceService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/services`,
            withCredentials: true
        });
        this.service = service;
    }

    getServices = state => {
        console.log('pepito')
        return this.service
            .get("/getServices", {
                state
            })
            .then(response => response.data);
    };


}