import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const consultAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-consult`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-consult`, obj);
    },
};

export default consultAPI;
