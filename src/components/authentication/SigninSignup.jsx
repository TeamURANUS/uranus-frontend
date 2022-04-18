import React, {Component} from 'react';
import {Input, Button, Modal} from 'antd';
import {UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined} from '@ant-design/icons';

import {forgotPassword, login, register} from "../../services/authentication";
import {getUserByEmail} from "../../services/user";

const svgPath = process.env.PUBLIC_URL + '/svg/';


class SigninSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: "",
            loginError: "",
            registerEmail: "",
            registerPassword: "",
            registerError: "",
            forgotModal: false
        };
    }


    login = async (email, password) => {
        const res = await login(email, password);
        if (res.status === 200) {
            const dbUser = await getUserByEmail(res.data.data.email);
            const user = {
                email: res.data.data.email,
                id: res.data.data.uid,
                isVerified: res.data.data.emailVerified,
                refreshToken: res.data.data.stsTokenManager.refreshToken,
                accessToken: res.data.data.stsTokenManager.accessToken,
                name: dbUser.data[0].userName,
                lastname: dbUser.data[0].userLastname,
                university: dbUser.data[0].userColleague,
                phone: dbUser.data[0].userPhoneNumber,
                othermail: dbUser.data[0].userOtherMail,
                image: dbUser.data[0].userImage
            };
            this.props.setUser(user, false);
        } else {
            this.setState({loginError: res.data.message.replace("Firebase:", "").replace("auth/", "").replace(".", "")});
        }
    };

    register = async (email, password) => {
        const res = await register(email, password);
        if (res.status === 201) {
            const user = {
                email: res.data.data.email,
                id: res.data.data.uid,
                isVerified: res.data.data.emailVerified,
                refreshToken: res.data.data.stsTokenManager.refreshToken,
                accessToken: res.data.data.stsTokenManager.accessToken,
                name: "",
                lastname: "",
                university: "",
                phone: "",
                othermail: "",
                image: ""
            };
            this.props.setUser(res.data.data, true);
        } else {
            this.setState({registerError: res.data.message.replace("Firebase:", "").replace("auth/", "").replace(".", "")});
        }
    };

    onForgotPassword = async () => {
        this.setState({forgotModal: true});
        await forgotPassword(this.state.loginEmail);
    };

    render() {
        return (

            <div className="flex flex-row mx-auto place-content-center flex-wrap items-baseline h-screen">
                <Modal
                    closable={false}
                    title="Password Reset"
                    cancelButtonProps={{style: {display: 'none'}}}
                    onOk={() => {
                        this.setState({forgotModal: false});
                    }}
                    visible={this.state.forgotModal}>
                    <p>Password reset link will send your email if it is registered </p>
                </Modal>
                <div className="max-w-lg min-w-[25%] mx-4  p-6 drop-shadow-xl bg-white rounded-md">
                    <img
                        className="w-80 m-auto"
                        src={`${svgPath}undraw_login_re_4vu2.svg`}
                        alt="login"
                    />
                    <br/><br/>
                    <h1 className="text-2xl text-center">Login</h1>
                    <br/><br/>
                    <Input size="large" placeholder="email" prefix={<UserOutlined/>} onChange={(e) => {
                        this.setState({loginEmail: e.target.value});
                    }}/>
                    <br/><br/>
                    <Input.Password
                        placeholder="password" size="large"
                        prefix={<LockOutlined/>}
                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        onChange={(e) => {
                            this.setState({loginPassword: e.target.value});
                        }}
                    />
                    <br/><br/>
                    <button onClick={() => {
                        this.onForgotPassword();
                    }} className="block w-full text-right underline hover:text-red-500 cursor-pointer">Forgot Password?
                    </button>
                    <p className="text-red-600">{this.state.loginError}</p>
                    <Button type="primary" size="large" onClick={() => {
                        this.login(this.state.loginEmail, this.state.loginPassword);
                    }}>Login</Button>
                </div>
                <div className="max-w-lg min-w-[25%] mx-4 p-6 drop-shadow-xl bg-white rounded-md">
                    <img
                        className="w-80 m-auto"
                        src={`${svgPath}undraw_sign_in_re_o58h.svg`}
                        alt="register"
                    />
                    <br/><br/>
                    <h1 className="text-2xl text-center">Register</h1>
                    <br/><br/>
                    <Input size="large" placeholder="email" prefix={<UserOutlined/>}
                           onChange={(e) => {
                               this.setState({registerEmail: e.target.value});
                           }}/>
                    <br/><br/>
                    <Input.Password
                        placeholder="password" size="large"
                        prefix={<LockOutlined/>}
                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        onChange={(e) => {
                            this.setState({registerPassword: e.target.value});
                        }}
                    />
                    <br/><br/>
                    <br/>
                    <p className="text-red-600">{this.state.registerError}</p>
                    <Button type="primary" size="large" onClick={() => {
                        this.register(this.state.registerEmail, this.state.registerPassword);
                    }}>Register</Button>
                </div>
            </div>
        );
    }
}

export default SigninSignup;
