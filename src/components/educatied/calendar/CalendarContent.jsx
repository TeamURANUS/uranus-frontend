import React, {Component} from 'react';
import {getUserEvents} from "../../../services/event";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import EventDetail from "./EventDetail";

const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toString().substring(0, 15);
};

class CalendarContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [], allEvents: [], activeDate: new Date()
        };
    }


    async componentDidMount() {
        let result = await getUserEvents(this.props.user.id);
        result = result.data.map(x => ({
            id: x.id,
            capacity: x.eventCapacity,
            description: x.eventDescription,
            participants: x.eventParticipants.length,
            duration: x.eventDuration,
            link: x.eventLink,
            place: x.eventPlace,
            organizerName: x.organizerName,
            organizerID: x.eventOrganizers[0]._key.path.segments[6],
            date: toDateTime(x.eventDate.seconds)
        }));
        this.setState({allEvents: result});
        this.setState({events: result.filter(x => x.date === this.state.activeDate.toString().substring(0, 15))});
    }

    onChange = (date) => {
        this.setState({activeDate: date});
        this.setState({events: this.state.allEvents.filter(x => x.date === date.toString().substring(0, 15))});
    };


    render() {
        return (<div className="my-2 mx-2 flex md:flex-row flex-col ">
            <Calendar onChange={(e) => {
                this.onChange(e);
            }}
                      className="my-[10%] mx-4 p-4 !border-none !border-zinc-200 !rounded !font-['Poppins']"
            />
            <div className="mx-12 min-w-[500px] md:min-w-[800px]">
                <p className="font-bold text-xl"> Events of {this.state.activeDate.toString().substring(0, 15)}</p>
                <ul className=" select-none ">
                    {this.state.events.map((item, index) => {
                        return <EventDetail index={index} key={index} item={item}/>;
                    })}
                </ul>
            </div>
        </div>);
    }
}

export default CalendarContent;
