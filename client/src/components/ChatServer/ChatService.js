import axios from "axios";

export default class ChatService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/chat`,
            withCredentials: true
        });
        this.service = service;
    }

    getMessages = state => {
        return this.service
            .get("/getMessages", {
                state
            })
            .then(response => response.data);
    };
    createChatRoom = (mainUser, invitedUser) => {
        return this.service
            .post("/createChatRoom", {
                mainUser,
                invitedUser
            })
            .then(response => response.data);
    }

}