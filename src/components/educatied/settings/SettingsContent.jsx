import React, {Component, useContext} from 'react';
import {Avatar, Modal} from "antd";
import {signInWithGoogle} from "../../../services/firebase";

const settingsField = (title, content) => {
    return (
        <div className="border py-2 px-6 flex rounded mt-16 p-5">
            <div className=" mx-6 w-full  font-black text-lg">
                {title}
            </div>
            <div className="col-span-2 w-full text-center text-[16px] ">
                {content}
            </div>
        </div>
    );
};

class SettingsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
    }


    render() {
        return (
            <div className="grid my-4 mx-8 flex border-2 p-10 shadow-2xl shadow-indigo-500/50">
                <div className="flex  ">
                    <div className=" ">
                        <Avatar className="drop-shadow-xl z-0" size={120}
                                src={"https://joeschmoe.io/api/v1/" + this.props.user.id}/>
                    </div>
                    <p className="mt-12 ml-4 col-span-2 w-full text-2xl font-black ">
                        {"Welcome, " + this.props.user.name + " " + this.props.user.lastname}
                    </p>
                </div>
                <div className="flex grid grid-rows-3 items-center ">
                    {settingsField("Email", this.props.user.email)}
                    {settingsField("Phone", this.props.user.phone)}
                    {settingsField("University", this.props.user.university)}
                </div>
                <div className="flex w-full rounded mt-5  h-full">
                    <button
                        onClick={signInWithGoogle}
                        className="min-w-[280px] border bg-sky-600 text-white hover:bg-sky-500 py-2 px-8  rounded mx-6 my-4 w-full items-center flex justify-items-center"
                    >
                        <i className="ri-google-fill mx-2"/>
                        <span> Add Google Account </span>
                    </button>
                    <button
                        onClick={() => {
                            this.props.logout();
                        }}
                        className="min-w-[280px] border bg-red-600 text-white hover:bg-red-500 py-2 px-8 my-4 rounded mx-6 w-full">
                        Logout
                    </button>
                    <a
                        href="mailto:teamuranusproject@gmail.com"
                        className="block text-black text-center flex items-center justify-items-center pt-4 min-w-[280px] border border-green-500 hover:text-white hover:bg-green-500 py-2 px-8 my-4 rounded mx-6 w-full">
                        Mail Us For Requests
                    </a>

                </div>
            </div>
        );
    }
}

export default SettingsContent;
