import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const typeAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-type`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-type`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-type`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-type/${id}`);
    },
};

export default typeAPI;
