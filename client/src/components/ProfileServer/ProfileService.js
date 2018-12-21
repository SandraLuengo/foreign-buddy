import axios from 'axios';


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

        return this.service
            .post('/upload_photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => response.data);
    };

    editProfileData = (user, description,age,language1,language2,buddy_gender) => {
        return this.service
            .post('/editProfileData', {
                user,
                description,
                age,
                language1,
                language2,
                buddy_gender
            })
            .then(response => response.data)
    }

    editInterests = (interests,user) =>{
        return this.service
        .post('/editInterests',{
            interests,
            user
        }).then(response => response.data)
    }
}