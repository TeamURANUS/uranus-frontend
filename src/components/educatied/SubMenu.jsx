import React, {Component} from 'react';
import Group from "./home/Group";

import {getGroups, getGroupsByUser, updateGroupData} from "../../services/groups";
import {Modal} from "antd";

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joinModal: false,
            joinIndex: -1,
            joinInfoModel: false,
            groupsForJoin: []
        };
    }

    getUserGroups = async () => {
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
                            privacyPermissions: x[1].groupPrivacyPermissions,
                            posts: x[1].groupPosts.map(a => a._key.path.segments[6].trim())
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
                            privacyPermissions: x[1].groupPrivacyPermissions,
                            posts: x[1].groupPosts.map(a => a._key.path.segments[6].trim())
                        }
                    ))
                );
            }
        }
    };


    async componentDidMount() {
        await this.getUserGroups();
    }

    joinNewGroup = async (index) => {
        this.setState({joinIndex: index, joinModal: false});
        const data = {
            groupMembers: [...this.state.groupsForJoin[index].members, this.props.user.id]
        };
        const result = await updateGroupData(this.state.groupsForJoin[index].id, data);
        this.setState({joinInfoModel: true});
        await this.getUserGroups();
    };

    openModal = async () => {
        this.setState({joinModal: true});
        let groups = await getGroups();
        console.log(groups.data.data);
        groups = groups.data.data.filter(x => this.props.activeGroup === "class" ? x.groupIsCommunity === false : x.groupIsCommunity)
            .map(x => (
                {
                    id: x.id,
                    name: x.groupName,
                    role: "member",
                    description: x.groupDescription,
                    admin: x.groupAdmin._key.path.segments[6].trim(),
                    assistants: x.groupAssistants.map(a => a._key.path.segments[6].trim()),
                    members: x.groupMembers.map(a => a._key.path.segments[6].trim()),
                    postPermissions: x.groupPostPermissions,
                    privacyPermissions: x.groupPrivacyPermissions,
                    posts: x.groupPosts.map(a => a._key.path.segments[6].trim())
                }
            ));
        groups = groups.filter(x => this.props.activeGroup === "class"
            ? !this.props.classes.map(a => a.id).includes(x.id) : !this.props.communities.map(a => a.id).includes(x.id));
        console.log(groups);
        this.setState({groupsForJoin: groups});
    };

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
                    <li className=
                            "flex items-center my-2 p-1 py-2 hover:bg-sky-400 hover:text-white rounded-sm border-b border-b-gray-300"
                        onClick={() => {
                            this.openModal();
                        }}
                    >
                        <i className="ri-add-line text-black-500 inline-block !text-xl px-1"
                        />
                        <span className="text-md pl-2">New Class</span>
                    </li>
                </ul>
                : <ul className="cursor-default">
                    {this.props.communities.map((item, index) => {
                        return <Group key={index} data={item} index={index}
                                      active={false}
                                      onClick={this.props.activeGroupIndexChange}/>;
                    })}
                    <li className=
                            "flex items-center my-2 p-1 py-2 hover:bg-sky-400 hover:text-white rounded-sm border-b border-b-gray-300"
                        onClick={() => {
                            this.openModal();
                        }}
                    >
                        <i className="ri-add-line text-black-500 inline-block !text-xl px-1"
                        />
                        <span className="text-md pl-2">New Community</span>
                    </li>
                </ul>}
            <Modal
                closable={false}
                cancelButtonProps={{style: {display: 'none'}}}
                title={this.props.activeGroup === "class"
                    ? "Join New Class"
                    : "Join New Community"}
                visible={this.state.joinModal} onOk={() => {
                this.setState({joinModal: false});
            }}>
                {this.state.groupsForJoin.map((item, index) => {
                    return <li key={index} onClick={() => this.joinNewGroup(index)}
                               className="border-b border-zinc-2oo py-2 px-2 hover:text-white hover:bg-sky-500 cursor-pointer"
                    >{item.name}</li>;
                })}
            </Modal>
            <Modal
                closable={false}
                cancelButtonProps={{style: {display: 'none'}}}
                title="Welcome"
                visible={this.state.joinInfoModel} onOk={() => {
                this.setState({joinInfoModel: false});
            }}>
                <p>Welcome {this.state.joinIndex >= 0 ? this.state.groupsForJoin[this.state.joinIndex].name : ""}</p>
            </Modal>
        </div>);
    }
}

export default SubMenu;
