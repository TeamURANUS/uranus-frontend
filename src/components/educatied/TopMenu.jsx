import React, {Component} from 'react';

class TopMenu extends Component {
    render() {
        return (
            <div className="w-full flex border-b border-blue-300 fixed bg-white max-h-[4rem]">
                <p className="basis-1/4 text-center text-2xl font-bold flex items-center ml-4">Educatied</p>
                <p className="basis-2/4 font-bold flex items-center pl-5">{this.props.path.join("/")}</p>
                <div className=" flex justify-end items-center basis-1/4 mr-5">
                    <i className="ri-user-line text-black-500 inline-block !text-2xl px-1"/>
                    <p className="text-xl px-1 pt-4">User</p>
                </div>
            </div>
        );
    }
}

export default TopMenu;
