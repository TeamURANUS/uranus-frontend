import React, {Component} from 'react';
import {Button, Input} from 'antd';


import {addUser} from "../../services/user";

const svgPath = process.env.PUBLIC_URL + '/svg/';


class ExtraInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            lastname: "",
            university: "",
            othermail: "",
            phone: "",
            imageUrl: "",
            error: ""
        };
    }

    saveUser = async () => {
        if (this.state.name === "" || this.state.lastname === "") {
            this.setState({error: "Name and lastname is required"});
        } else {
            const user = {
                email: this.props.user.email,
                id: this.props.user.uid,
                isVerified: this.props.user.emailVerified,
                refreshToken: this.props.user.stsTokenManager.refreshToken,
                accessToken: this.props.user.stsTokenManager.accessToken,
                name: this.state.name,
                lastname: this.state.lastname,
                university: this.state.university,
                phone: this.state.phone,
                othermail: this.state.othermail,
                image: "https://joeschmoe.io/api/v1/" + Math.floor(Math.random() * 18).toString()
            };
            this.props.setUser(user, false);
            await addUser(user);
        }
    };


    render() {
        return (
            <div className="flex flex-row mx-auto place-content-center flex-wrap items-baseline h-screen">
                <div className="max-w-lg min-w-[25%] mx-4  p-6 drop-shadow-xl bg-white rounded-md flex flex-col">
                    <img
                        className="w-80 m-auto"
                        src={`${svgPath}undraw_welcoming_re_x0qo.svg`}
                        alt="info"
                    />
                    <br/><br/>
                    <span>Name*</span>
                    <Input size="large" placeholder="Name" onChange={(e) => {
                        this.setState({name: e.target.value});
                    }}/>
                    <br/>
                    <span>Lastname*</span>
                    <Input size="large" placeholder="Lastname" onChange={(e) => {
                        this.setState({lastname: e.target.value});
                    }}/>
                    <br/>
                    <span>University</span>
                    <Input size="large" placeholder="University" onChange={(e) => {
                        this.setState({university: e.target.value});
                    }}/>
                    <br/>
                    <span>Phone</span>
                    <Input size="large" placeholder="Phone" onChange={(e) => {
                        this.setState({phone: e.target.value});
                    }}/>
                    <br/>
                    <span>Second Email</span>
                    <Input size="large" placeholder="Second Email" onChange={(e) => {
                        this.setState({othermail: e.target.value});
                    }}/>
                    <br/>
                    <p className="text-red-600 text-lg">{this.state.error}</p>
                    <Button type="primary" size="large" onClick={() => {
                        this.saveUser();
                    }}
                    >Next</Button>

                </div>
            </div>
        );
    }
}

export default ExtraInformation;
