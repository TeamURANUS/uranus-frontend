import React, {Component} from 'react';

class Group extends Component {

    render() {
        return (
            <li className={this.props.active
                ? "flex items-center my-2 p-1 py-2 bg-blue-400 text-white rounded-sm border-b border-b-gray-300"
                : "flex items-center my-2 p-1 py-2 hover:bg-blue-400 hover:text-white rounded-sm border-b border-b-gray-300"}
                onClick={() => {this.props.onClick(this.props.index)}}
            >
                <i className="ri-stop-mini-line text-black-500 inline-block !text-xl px-1"
                />
                <span className="text-md pl-2">{this.props.groupName}</span>
            </li>
        );
    }
}

export default Group;
