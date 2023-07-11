import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const courseAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-course`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-course`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-course`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-course/${id}`);
    },
    getCourseBy: (obj) => {
        return axios.post(`http://localhost:9000/getby-course`, obj);
    },
    getCourseBeLongType: (obj) => {
        return axios.post(`http://localhost:9000/getby-coursebelongtype`, obj);
    },
};

export default courseAPI;
