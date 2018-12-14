import axios from "axios";

export default class BuddiesService {
    constructor() {
        let service = axios.create({
            baseURL: "http://localhost:5000/buddies",
            withCredentials: true
        });
        this.service = service;
    }

    getChatUsers = user => {
        //console.log(user)
        return this.service
            .post("/getChatUsers", {
                user
            })
            .then(response => response.data);
    };


}