import React, {Component} from 'react';
import Group from "./home/Group";

import {getGroupsByUser} from "../../services/groups";

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            communities: []
        };
    }


    async componentDidMount() {
        const result = await getGroupsByUser(this.props.user.id);
        if (result.status === 200) {
            this.props.setClasses(
                result.data.map(x => (
                    {
                        id: x[1].id,
                        name: x[1].groupName,
                        role: x[0],
                        description: x[1].groupDescription,
                        admin: x[1].groupAdmin._key.path.segments[6].trim(),
                        assistants: x[1].groupAssistants.map(a => a._key.path.segments[6].trim()),
                        members: x[1].groupMembers.map(a => a._key.path.segments[6].trim()),
                        postPermissions: x[1].groupPostPermissions,
                        privacyPermissions: x[1].groupPrivacyPermissions
                    }
                ))
            );
        }
    }

    render() {
        return (<div className="mt-[5rem] w-180 min-w-[240px] h-screen max-w-[280px] bg-blue p-2 drop-shadow-right">
            <select className="ml-[10%] w-[80%] text-center mx-auto border-b border-gray-300 py-1 text-lg mt-5 mb-5"
                    onChange={(e) => {
                        this.props.activeGroupChange(e.target.value);
                    }}>
                <option value="class">Classes</option>
                <option value="community">Communities</option>
            </select>
            {this.props.activeGroup === "class" ?
                <ul className="cursor-default select-none">
                    {this.props.classes.map((item, index) => {
                        return <Group key={index} data={item} index={index}
                                      active={this.props.activeGroupIndex === index+1}
                                      onClick={this.props.activeGroupIndexChange}/>;
                    })}
                </ul>
                : <ul className="cursor-default">
                    <Group active={this.props.activeGroupIndex === 1} groupName="Community 1"/>
                    <Group active={this.props.activeGroupIndex === 2} groupName="Community 2"/>
                    <Group active={this.props.activeGroupIndex === 3} groupName="Community 3"/>
                    <Group active={this.props.activeGroupIndex === 4} groupName="Community 4"/>
                    <Group active={this.props.activeGroupIndex === 5} groupName="Community 5"/>
                </ul>}
        </div>);
    }
}

export default SubMenu;
