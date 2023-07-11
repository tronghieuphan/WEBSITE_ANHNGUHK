import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const dashboardAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall`);
    },
};

export default dashboardAPI;
