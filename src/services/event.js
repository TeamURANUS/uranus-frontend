import axios from "axios";

const backendUrl = "http://localhost:8081";

export const getUserEvents = async (userId) => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/events/userEventLog/' + userId
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};
