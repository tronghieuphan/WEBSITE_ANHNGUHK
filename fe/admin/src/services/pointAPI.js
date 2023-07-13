import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const pointAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-point`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-point`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-point`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-point/${id}`);
    },
    getByPointClass: (obj) => {
        return axios.post(`http://localhost:9000/getby-point`, obj);
    },
    getListPointClass: (obj) => {
        return axios.post(`http://localhost:9000/getlist-pointclass`, obj);
    },
    sendMail: (obj) => {
        return axios.post(`http://localhost:9000/send-mailpoint`, obj);
    },
};

export default pointAPI;
