import React, {Component} from 'react';
import Group from "./home/Group";

import {getGroupsByUser} from "../../services/groups";

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    async componentDidMount() {
        const result = await getGroupsByUser(this.props.user.id);
        if (result.status === 200) {
            if (this.props.activeGroup === "class") {
                this.props.setClasses(
                    result.data.filter(x => x[1].groupIsCommunity === false).map(x => (
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
            } else {
                this.props.setCommunities(
                    result.data.filter(x => x[1].groupIsCommunity === true).map(x => (
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
    }

    render() {
        return (<div className="mt-[5rem] w-180 min-w-[240px] h-screen max-w-[280px] bg-blue p-2 drop-shadow-right">
            <select className="ml-[10%] w-[80%] text-center mx-auto border-b border-gray-300 py-1 text-lg mt-5 mb-5"
                    onChange={(e) => {
                        this.props.activeGroupChange(e.target.value);
                    }}
                    defaultValue={this.props.activeGroup}>
                <option value="class">Classes</option>
                <option value="community">Communities</option>
            </select>
            {this.props.activeGroup === "class" ?
                <ul className="cursor-default select-none">
                    {this.props.classes.map((item, index) => {
                        return <Group key={index} data={item} index={index}
                                      active={this.props.activeGroupIndex === index + 1}
                                      onClick={this.props.activeGroupIndexChange}/>;
                    })}
                    <Group key={-2} data={{name: "New Class"}} index={-2}
                           onClick={null}/>
                </ul>
                : <ul className="cursor-default">
                    {this.props.communities.map((item, index) => {
                        return <Group key={index} data={item} index={index}
                                      active={false}
                                      onClick={this.props.activeGroupIndexChange}/>;
                    })}
                    <Group key={-2} data={{name: "New Community"}} index={-2}
                           onClick={null}/>
                </ul>}
        </div>);
    }
}

export default SubMenu;
