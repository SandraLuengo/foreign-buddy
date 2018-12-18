import axios from "axios";

export default class BuddiesService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/buddies`,
            withCredentials: true
        });
        this.service = service;
    }

    getBuddies = user => {
        return this.service
            .post("/getBuddies", {
                user
            })
            .then(response => response.data);
    }

    addNewBuddy = (id, currentUser) => {
        return this.service
            .post("/addNewBuddy", {
                id,
                currentUser
            })
            .then(response =>response.data)
    }

}