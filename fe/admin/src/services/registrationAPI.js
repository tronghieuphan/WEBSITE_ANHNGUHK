import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const registrationAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-registration`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-registration`, obj);
    },
    // update: (obj) => {
    //     return axios.put(`http://localhost:9000/update-registration`, obj);
    // },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-registration/${id}`);
    },
    getResCourseBy: (obj) => {
        return axios.post(`http://localhost:9000/getby-courseres`, obj);
    },
    getResBy: (obj) => {
        return axios.post(`http://localhost:9000/get-registrationby`, obj);
    },
    acceptPayment: (obj) => {
        return axios.post(`http://localhost:9000/accept-payment`, obj);
    },
    sendMail: (obj) => {
        return axios.post(`http://localhost:9000/send-mailregis`, obj);
    },
    checkClassesCourse: (obj) => {
        return axios.post(`http://localhost:9000/check-classescourse`, obj);
    },
    checkClasses: (obj) => {
        return axios.post(`http://localhost:9000/check-classes`, obj);
    },
    cancel: (obj) => {
        return axios.put(`http://localhost:9000/update-registration`, obj);
    },
};

export default registrationAPI;
