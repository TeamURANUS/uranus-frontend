import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';

class SigninSignup extends Component {
    render() {
        return (
            <div className='w-1/3 m-3'>
                <div>
                    <h1 className='text-2xl'>Register</h1>
                    <Input size="large" placeholder="email" prefix={<UserOutlined />} />
                    <br /><br />
                    <Input.Password
                        placeholder="password" size="large"
                        prefix={<LockOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <br /><br />
                    <Button type="primary">Register</Button>
                </div>
                <div>
                    <h1 className='text-2xl'>Login</h1>
                    <Input size="large" placeholder="email" prefix={<UserOutlined />} />
                    <br /><br />
                    <Input.Password
                        placeholder="password" size="large"
                        prefix={<LockOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <br /><br />
                    <Button type="primary">Login</Button>
                </div>
            </div>
        );
    }
}

export default SigninSignup;
