import React, {Component} from 'react';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
    }


    render() {
        return (
            <li className="my-2 mx-2 py-2 border-b border-zinc-200 w-full">
                <span className="block flex flex text-[16px]">
                    <i className="ri-play-fill"/>
                    <span className="mx-2 font-bold text-zinc-700">{this.props.item.description}</span>
                </span>
                <span className="block">
                    <span className="font-bold text-zinc-500">Created by: </span>
                    <span className="mx-2 text-zinc-700">{this.props.item.organizerName}</span>
                </span>
                <span className="block">
                    <span className="font-bold text-zinc-500">Place:</span>
                    <span className="mx-2">{this.props.item.place}</span>
                </span>
                <span className="block">
                    <span className="font-bold text-zinc-500">Duration:</span>
                    <span className="mx-2">{this.props.item.duration} minutes </span>
                    <span className="font-bold text-zinc-500">Participants:</span>
                    <span className="mx-2">{this.props.item.participants}</span>
                </span>
                <span className="block">
                    <a href={this.props.item.link} target="_blank">Click to add Google Calendar</a>
                </span>

            </li>
        );
    }
}

export default EventDetail;
