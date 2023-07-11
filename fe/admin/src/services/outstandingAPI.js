import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const outstandingAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-outstanding`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-outstanding`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-outstanding`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-outstanding/${id}`);
    },
};

export default outstandingAPI;
