import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const discountAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-discount`);
    },
    getAllActive: () => {
        return axios.get(`http://localhost:9000/getall-discountactive`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-discount`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-discount`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-discount/${id}`);
    },
};

export default discountAPI;
