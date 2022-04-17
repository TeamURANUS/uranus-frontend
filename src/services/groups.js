import axios from "axios";

const backendUrl = "http://localhost:8081";

export const getGroupsByUser = async (userid) => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/groups/allGroupsOfUser/' + userid
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const getPostsByGroupId = async (groupId) => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/posts/groupPosts/' + groupId
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const getCommentById = async (commentId) => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/comments/' + commentId
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};

export const getNotifications = async () => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/notifications'
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};

export const createPost = async (data) => {
    return await axios({
        method: 'post',
        url: backendUrl + '/api/posts',
        data: data
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const updateGroupData = async (groupId, data) => {
    return await axios({
        method: 'put',
        url: backendUrl + '/api/groups/' + groupId,
        data: data
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};

export const getGroups = async () => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/groups'
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};

