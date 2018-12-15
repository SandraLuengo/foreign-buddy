import axios from "axios";

export default class ProfileService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/profile`,
            withCredentials: true
        });
        this.service = service;
    }

    postPhoto = photo => {
        return this.service
            .post("/upload_photo", {
                photo
            })
            .then(response => response.data);
    };

    editInterests = (interests,user) => {
        console.log(interests)
        return this.service
        .post("/editInterests",{
            interests,
            user
        })
        .then(response => response.data)
    }

}