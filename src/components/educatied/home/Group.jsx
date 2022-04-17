import React, {Component} from 'react';

class Group extends Component {

    render() {
        return (
            <li className=
                    "flex items-center my-2 p-1 py-2 hover:bg-sky-400 hover:text-white rounded-sm border-b border-b-gray-300"
                onClick={() => {
                    this.props.onClick(this.props.index);
                }}
            >
                <i className="ri-checkbox-blank-circle-fill text-black-500 inline-block  px-1"
                />
                <span className="text-md pl-2">{this.props.data.name}</span>
            </li>
        );
    }
}

export default Group;
