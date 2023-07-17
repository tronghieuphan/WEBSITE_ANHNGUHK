import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const reviewAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-review`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-review`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-review`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-review/${id}`);
    },
    find: (obj) => {
        return axios.post(`http://localhost:9000/find-review`, obj);
    },
};

export default reviewAPI;
