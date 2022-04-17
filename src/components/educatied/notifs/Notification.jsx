import React, {Component} from 'react';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className="w-full my-3">
                <p>
                    <i className="ri-checkbox-blank-circle-fill"/><span
                    className="mx-1 font-bold text-gray-400">{this.props.data.date}</span>
                    <span className="text-zinc-500">{this.props.data.group}</span>
                </p>
                <p>{this.props.data.content}</p>
                <hr/>
            </div>
        );
    }
}

export default Notification;
