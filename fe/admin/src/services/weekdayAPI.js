import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const weekdayAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-weekday`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-weekday`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-weekday`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-weekday/${id}`);
    },
};

export default weekdayAPI;
