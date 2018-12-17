import axios from "axios";


export default class ProfileService {
    constructor() {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/profile`,
            withCredentials: true
        });
        this.service = service;
    }

    postPhoto = (file, id,rol) => {
        const formData = new FormData();
        formData.append('picture', file);
        formData.append('id', id);
        formData.append('rol', rol);
        console.log(formData)
        return this.service
            .post("/upload_photo", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => response.data);
    };

    editInterests = (interests, user) => {
        console.log(interests)
        return this.service
            .post("/editInterests", {
                interests,
                user
            })
            .then(response => response.data)
    }

}