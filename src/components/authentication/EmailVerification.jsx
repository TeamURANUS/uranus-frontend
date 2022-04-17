import React, {Component} from 'react';
import {Button} from 'antd';


const svgPath = process.env.PUBLIC_URL + '/svg/';


class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className="flex flex-row mx-auto place-content-center flex-wrap items-baseline h-screen">
                <div className="max-w-lg min-w-[25%] mx-4  p-6 drop-shadow-xl bg-white rounded-md flex flex-col">
                    <img
                        className="w-80 m-auto"
                        src={`${svgPath}undraw_secure_login_pdn4.svg`}
                        alt="verify"
                    />
                    <br/><br/>
                    <br/><br/>
                    <p className="text-2xl text-center">Please verify your email to continue to app</p>
                    <br/>
                    <Button type="primary" size="large" onClick={() => {
                        this.props.setUser(null,false);
                    }}
                            className=""
                    >Go Back</Button>

                </div>
            </div>
        );
    }
}

export default EmailVerification;
