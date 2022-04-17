import React, {Component} from 'react';
import {Avatar} from "antd";


const settingsField = (title, content) => {
    return(
        <div className="border-b-blue-500 border-4 grid grid-cols-3 w-full rounded mt-20 p-5">
            <div className="w-full text-center font-mono font-black text-3xl">
                    {title}
            </div>
            <div className="col-span-2 w-full text-center text-2xl italic">
                {content}
            </div>
        </div>
    );
}

class SettingsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
    }


    render() {
        return (
            <div className="grid my-4 mx-8 flex border-2 p-10 shadow-2xl shadow-indigo-500/50">
                <div className="grid grid-cols-3 w-full">
                    <div className="w-full text-center">
                        <Avatar className="border-solid border-2 border-blue-600 z-0" size={200} src={this.props.user.image}/>
                    </div>
                    <div className="col-span-2 w-full text-center text-blue-600 font-mono text-4xl font-black flex items-center justify-center">
                        {"Welcome, " + this.props.user.name + " " + this.props.user.lastname}
                    </div>
                </div>
                {settingsField("Email", this.props.user.email)}
                {settingsField("Phone", this.props.user.phone)}
                {settingsField("University", this.props.user.university)}
                <div className="grid grid-cols-2 w-full rounded mt-10 p-3.5 h-full">
                    <button
                        className="shadow-2xl m-10 text-3xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Add Google Account
                    </button>
                    <button
                        className="shadow-2xl m-10 text-3xl bg-red-600 hover:bg-red-800 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Logout
                    </button>
                </div>


            </div>
        );
    }
}

export default SettingsContent;
