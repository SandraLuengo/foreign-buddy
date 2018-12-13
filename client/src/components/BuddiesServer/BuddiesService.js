import axios from "axios";

export default class BuddiesService {
    constructor() {
        let service = axios.create({
            baseURL: "http://localhost:5000/buddies",
            withCredentials: true
        });
        this.service = service;
    }

    getBuddies = user => {
        console.log('getBuddies')
        return this.service
            .post("/getMybuddies", {
                user
            })
            .then(response => response.data);
    };


}