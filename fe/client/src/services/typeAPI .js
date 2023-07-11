import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const typeAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-type`);
    },
};

export default typeAPI;
