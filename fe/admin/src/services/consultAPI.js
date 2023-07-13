import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const consultAPI = {
    getAll: (obj) => {
        return axios.post(`http://localhost:9000/getall-consult`, obj);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-consult`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-consult`, obj);
    },
    accept: (obj) => {
        return axios.post(`http://localhost:9000/accept-consult`, obj);
    },
    acceptRes: (obj) => {
        return axios.post(`http://localhost:9000/accept-resconsult`, obj);
    },
    alertConsult: () => {
        return axios.get(`http://localhost:9000/datewait-consult`);
    },
};

export default consultAPI;
