import React, {Component} from 'react';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                className={this.props.open
                    ? "bg-white mt-[5rem] w-180 min-w-[180px] max-w-[180px] bg-blue p-2 !h-screen  cursor-default fixed select-none drop-shadow-right"
                    : "bg-white mt-[5rem] w-180 min-w-[60px] max-w-[180px] bg-blue p-2 !h-screen  cursor-default fixed select-none drop-shadow-right"}>
                <ul className="mt-2">
                    <li className="border-b border-zinc-300 flex items-center p-1 py-2 w-full  mb-2"
                            onClick={() => {
                                this.props.setOpen(!this.props.open);
                            }}>
                        <i className="ri-menu-2-line text-xl mr-2"/>
                        {this.props.open ? <span>Menu</span> : ""}
                    </li>
                    <li className={this.props.activeMenu === 1 ? "bg-blue-700 flex items-center p-1 py-2 text-white rounded-sm" : "flex items-center p-1 py-2 hover:bg-blue-700 hover:text-white rounded-sm"}
                        onClick={() => this.props.activeMenuChange(1)}>
                        <i className="ri-home-line text-black-500 inline-block !text-2xl px-1"/>
                        {this.props.open ? <span className="text-md pl-2">Home</span> : ""}
                    </li>
                    <li className={this.props.activeMenu === 2 ? "bg-blue-700 flex items-center p-1 py-2 text-white rounded-sm" : "flex items-center p-1 py-2 hover:bg-blue-500 hover:text-white rounded-sm"}
                        onClick={() => this.props.activeMenuChange(2)}>
                        <i className="ri-calendar-line text-black-500 inline-block !text-2xl px-1"/>
                        {this.props.open ? <span className="text-md pl-2">Calendar</span> : ""}
                    </li>
                    <li className={this.props.activeMenu === 3 ? "bg-blue-700 flex items-center p-1 py-2 text-white rounded-sm" : "flex items-center p-1 py-2 hover:bg-blue-500 hover:text-white rounded-sm"}
                        onClick={() => this.props.activeMenuChange(3)}>
                        <i className="ri-newspaper-line text-black-500 inline-block !text-2xl px-1"/>
                        {this.props.open ? <span className="text-md pl-2">News</span> : ""}
                    </li>
                    <li className={this.props.activeMenu === 4 ? "bg-blue-700 flex items-center p-1 py-2 text-white rounded-sm" : "flex items-center p-1 py-2 hover:bg-blue-500 hover:text-white rounded-sm"}
                        onClick={() => this.props.activeMenuChange(4)}>
                        <i className="ri-notification-badge-line text-black-500 inline-block !text-2xl  px-1"/>
                        {this.props.open ? <span className="text-md pl-2">Notifs</span> : ""}
                    </li>
                    <li className={this.props.activeMenu === 5 ? "bg-blue-700 flex items-center p-1 py-2 text-white rounded-sm" : "flex items-center p-1 py-2 hover:bg-blue-500 hover:text-white rounded-sm"}
                        onClick={() => this.props.activeMenuChange(5)}>
                        <i className="ri-settings-4-line text-black-500 inline-block !text-2xl px-1"/>
                        {this.props.open ? <span className="text-md pl-2">Settings</span> : ""}
                    </li>

                </ul>
            </div>
        );
    }
}

export default MainMenu;
