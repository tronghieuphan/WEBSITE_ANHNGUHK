import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const outstandingAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-outstanding`);
    },
};

export default outstandingAPI;
