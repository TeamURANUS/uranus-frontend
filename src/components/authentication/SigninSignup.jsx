import React, {Component} from 'react';
import {Input, Button} from 'antd';
import {UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined} from '@ant-design/icons';

const svgPath = process.env.PUBLIC_URL + '/svg/';

class SigninSignup extends Component {
    render() {
        return (
            <div className='flex flex-row mx-auto place-content-center flex-wrap items-baseline h-screen'>
                <div className="max-w-lg min-w-[25%] mx-4 p-6 drop-shadow-xl bg-white rounded-md">
                    <img
                        className="w-80 m-auto"
                        src={`${svgPath}undraw_sign_in_re_o58h.svg`}
                        alt="register"
                    />
                    <br/><br/>
                    <h1 className='text-2xl text-center'>Register</h1>
                    <br/><br/>
                    <Input size="large" placeholder="email" prefix={<UserOutlined/>}/>
                    <br/><br/>
                    <Input.Password
                        placeholder="password" size="large"
                        prefix={<LockOutlined/>}
                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                    <br/><br/>
                    <Button type="primary">Register</Button>
                </div>
                <div className="max-w-lg min-w-[25%] mx-4  p-6 drop-shadow-xl bg-white rounded-md">
                    <img
                        className="w-80 m-auto"
                        src={`${svgPath}undraw_login_re_4vu2.svg`}
                        alt="login"
                    />
                    <br/><br/>
                    <h1 className='text-2xl text-center'>Login</h1>
                    <br/><br/>
                    <Input size="large" placeholder="email" prefix={<UserOutlined/>}/>
                    <br/><br/>
                    <Input.Password
                        placeholder="password" size="large"
                        prefix={<LockOutlined/>}
                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                    <br/><br/>
                    <Button type="primary">Login</Button>
                </div>
            </div>
        );
    }
}

export default SigninSignup;
