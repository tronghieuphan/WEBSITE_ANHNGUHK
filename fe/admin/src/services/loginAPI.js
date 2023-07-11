import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const classifyAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-classify`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-classify`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-classify`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-classify/${id}`);
    },
};

export default classifyAPI;
