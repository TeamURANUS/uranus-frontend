import React, {Component} from 'react';
import {Avatar, Dropdown, Menu} from "antd";


class TopMenu extends Component {
    menu = (
        <Menu>
            <Menu.Item key="0">
                <span className="text-red-600 block text-center hover:text-blue-600 w-full"
                      onClick={() => {
                          this.props.logout();
                      }}>Logout</span>
            </Menu.Item>
        </Menu>
    );


    render() {
        return (
            <div className="z-10 w-full flex items-center fixed bg-white max-h-[4rem] h-[4rem] drop-shadow-xl">
                <p className="basis-3/4 text-center text-2xl font-bold flex items-center justify-items-center ml-4 my-0">Educatied</p>
                <div className=" flex justify-end items-center basis-1/4 mr-5">
                    <Dropdown overlay={this.menu} trigger={['click']}>
                        <span className="select-none flex items-center text-black" onClick={e => e.preventDefault()}>
                            <Avatar size={40} src={this.props.user.image}/>
                            <span className="ml-2">{this.props.user.name + " " + this.props.user.lastname}</span>
                            <i className="ri-arrow-down-s-line text-[24px] mt-[2px] ml-1"/>
                        </span>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default TopMenu;
