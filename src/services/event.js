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

export const getGroupEvents = async (groupID) => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/events/organizationEventLog/' + groupID
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const createEvent = async (data) => {
    return await axios({
        method: 'post',
        url: backendUrl + '/api/events',
        data: data
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};
