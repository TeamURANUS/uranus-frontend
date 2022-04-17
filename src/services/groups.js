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

