import axios from "axios";

const backendUrl = "http://localhost:8081";

export const getUserById = async (userid) => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/users/' + userid
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const getAllUsers = async () => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/users'
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const getUserByEmail = async (email) => {
    return await axios({
        method: 'post',
        url: backendUrl + '/api/users/email/',
        data: {
            email: email
        }
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const addUser = async (user) => {
    return await axios({
        method: 'post',
        url: backendUrl + '/api/users/',
        data: {
            userColleague: user.university,
            userId: user.id,
            userLastname: user.lastname,
            userName: user.name,
            userOtherMail: user.email,
            userPhoneNumber: user.phone,
            userSchoolMail: user.othermail,
            userImage: user.image
        }
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


