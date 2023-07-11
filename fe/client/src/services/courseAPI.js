import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const courseAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-course`);
    },
    getCourseBy: (obj) => {
        return axios.post(`http://localhost:9000/getby-course`, obj);
    },
    getCourseBeLongType: (obj) => {
        return axios.post(`http://localhost:9000/getby-coursebelongtype`, obj);
    },findCourse: (obj) => {
        return axios.post(`http://localhost:9000/find-course`, obj);
    },
};

export default courseAPI;
