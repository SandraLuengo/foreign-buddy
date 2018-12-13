import axios from "axios";

export default class ChatService {
    constructor() {
        let service = axios.create({
            baseURL: "http://localhost:5000/chat",
            withCredentials: true
        });
        this.service = service;
    }

    getMessages = state => {
        return this.service
            .post("/getMessages", {
                state
            })
            .then(response => response.data);
    };


}