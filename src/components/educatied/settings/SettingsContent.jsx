import React, {Component, useContext} from 'react';
import {Avatar} from "antd";
import {signInWithGoogle} from "../../../services/firebase";

const settingsField = (title, content) => {
    return(
        <div className="border-b-blue-500 border-4 grid grid-cols-3 rounded mt-20 p-5">
            <div className="w-full text-center font-mono font-black text-xl">
                    {title}
            </div>
            <div className="col-span-2 w-full text-center text-lg italic">
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
                        <Avatar className="border-solid border-2 border-blue-600 z-0" size={150} src={this.props.user.image}/>
                    </div>
                    <div className="col-span-2 w-full text-center text-blue-600 font-mono text-3xl font-black flex items-center justify-center">
                        {"Welcome, " + this.props.user.name + " " + this.props.user.lastname}
                    </div>
                </div>
                <div className="flex grid grid-rows-3 items-center justify-center">
                    {settingsField("Email", this.props.user.email)}
                    {settingsField("Phone", this.props.user.phone)}
                    {settingsField("University", this.props.user.university)}
                </div>
                <div className="grid grid-cols-2 w-full rounded mt-5  h-full">
                    <button
                        onClick={signInWithGoogle}
                        className="shadow-2xl m-10 text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Add Google Account
                    </button>
                    <button
                        onClick={() => {
                            this.props.logout();
                        }}
                        className="shadow-2xl m-10 text-2xl bg-red-600 hover:bg-red-800 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Logout
                    </button>

                </div>


            </div>
        );
    }
}

export default SettingsContent;
