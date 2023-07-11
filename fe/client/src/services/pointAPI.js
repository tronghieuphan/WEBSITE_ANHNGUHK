import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const pointAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-point`);
    },
    getByPointClass: (obj) => {
        return axios.post(`http://localhost:9000/getby-point`, obj);
    },
    getListPointClass: (obj) => {
        return axios.post(`http://localhost:9000/getlist-pointclass`, obj);
    },
    getPointStudentClass: (obj) => {
        return axios.post(`http://localhost:9000/find-pointstudent`, obj);
    },
};

export default pointAPI;
