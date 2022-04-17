import React, {Component} from 'react';
import {getNotifications} from "../../../services/groups";
import Notification from "./Notification";

const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toLocaleString("en-GB").replace(",", "");
};

class NotificationContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifs: []
        };
    }

    async componentDidMount() {
        let result = await getNotifications();
        console.log(result);
        result = result.data.data.map(x => ({
            id: x.id,
            content: x.notifContent,
            date: toDateTime(x.notifDate.seconds),
            groups: x.notifTargetGroup.map(a => a._key.path.segments[6])
        }));
        let groups = this.props.classes.map(x => ({
            id: x.id,
            name: x.name
        }));
        groups.push(...this.props.communities.map(x => ({
            id: x.id,
            name: x.name
        })));
        result = result.filter(x => x.groups.some(y => groups.map(a => a.id).includes(y)));
        result = result.map(x => ({
            id: x.id,
            content: x.content,
            date: x.date,
            group: groups.filter(y => y.id === x.groups[0])[0].name
        }));
        this.setState({notifs: result});
    }


    render() {
        return (
            <div className="my-2 mx-4">
                <p className="font-bold text-xl my-2">Notifications</p>
                <ul className="my-4">
                    {this.state.notifs.map((item, index) => {
                        return <Notification index={index} key={index} data={item}/>;
                    })}
                </ul>
            </div>
        );
    }
}

export default NotificationContent;
