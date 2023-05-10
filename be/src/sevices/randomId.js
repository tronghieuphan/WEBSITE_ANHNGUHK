import { v4 as uuid } from "uuid";

let randomId = (id) => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 6);
    return id + small_id.toUpperCase();
};
module.exports = {
    randomId,
};
