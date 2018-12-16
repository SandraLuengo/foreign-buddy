import axios from "axios";

export default class ChatService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/chat`,
            withCredentials: true
        });
        this.service = service;
    }

    getMessages = id_chat => {
        console.log(`llamamos a getMessages: ${id_chat}`)
        return this.service
            .post("/getMessages", {
                id_chat
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

    getChatUsers = user => {
        //console.log(user)
        return this.service
            .post("/getChatUsers", {
                user
            })
            .then(response => response.data);
    };
}