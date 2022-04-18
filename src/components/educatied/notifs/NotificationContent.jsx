import React, {Component} from 'react';
import {getNotifications} from "../../../services/groups";
import Notification from "./Notification";

const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toLocaleString("en-GB").replace(",", "");
};


const svgPath = process.env.PUBLIC_URL + '/svg/';

class NotificationContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifs: []
        };
    }

    async componentDidMount() {
        let result = await getNotifications();
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
            <div className="my-4 mx-8 flex w-full">
                <div className="w-1/2 hidden md:block">
                    <p className="font-bold text-xl my-2">Notifications</p>
                    <img
                        className=" mt-12"
                        src={`${svgPath}undraw_new_notifications_re_xpcv.svg`}
                        alt="verify"
                    />
                </div>
                <div>
                    <p className="md:hidden font-bold text-xl my-2">Notifications</p>
                    <ul className="my-12 mx-12">
                        {this.state.notifs.map((item, index) => {
                            return <Notification index={index} key={index} data={item}/>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default NotificationContent;
