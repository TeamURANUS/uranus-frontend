import React, {Component} from 'react';
import PostList from "./PostList";
import WritePost from "./WritePost";
import ReadPost from "./ReadPost";
import {Modal} from "antd";
import {createPost, updateGroupData} from "../../../services/groups";
import {createEvent, getGroupEvents} from "../../../services/event";

const svgPath = process.env.PUBLIC_URL + '/svg/';

const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toLocaleString("en-GB").replace(",", "");
};

class GroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            createModal: false,
            leaveModal: false,
            eventModal: false,
            createEventModal: false,
            events: [],
            description: "",
            date: new Date(),
            duration: 0,
            place: "",
            capacity: 0,
            eventCreateModalConfirm: false,
            onLeaveAdminModal: false
        };
    }

    async componentDidMount() {

    }

    setCreatePostScreen = (s) => {
        this.props.setCreatePost(s);
    };

    onCreatePost = async (title, content) => {
        this.setState({createModal: true});
        const activeGroup = this.props.activeGroup === "class" ? this.props.classes[this.props.activeGroupIndex] : this.props.communities[this.props.activeGroupIndex];
        const postData = {
            postGroupId: activeGroup.id,
            postAuthor: this.props.user.id,
            postComments: [],
            postDate: new Date(),
            postContent: content,
            postTitle: title
        };
        const postResult = await createPost(postData);
        const postID = postResult.data.message.replace("Post added successfully! ", "").trim();
        const postIdList = activeGroup.posts;
        postIdList.push(postID);
        this.setCreatePostScreen(false);
        await updateGroupData(activeGroup.id, {groupPosts: postIdList});
        this.props.reGetPost();
        this.setState({createModal: false});
    };

    onLeaveGroup = async () => {
        const group = this.props.activeGroup === "class" ? this.props.classes[this.props.activeGroupIndex] : this.props.communities[this.props.activeGroupIndex];
        if (group.role !== "admin") {
            this.setState({leaveModal: true, modal: false});
            this.props.setStateData({activeGroupIndex: -1});
            if (this.props.activeGroup === "class") {
                this.props.setClasses(this.props.classes.filter(x => x.id !== group.id));
            } else {
                this.props.setCommunities(this.props.classes.filter(x => x.id !== group.id));
            }
            const data = {
                groupMembers: group.members.filter(x => x !== this.props.user.id)
            };
            await updateGroupData(group.id, data);
        } else {
            this.setState({onLeaveAdminModal: true, modal:false});
        }
    };

    onAssigmentShow = async () => {
        const group = this.props.activeGroup === "class" ? this.props.classes[this.props.activeGroupIndex] : this.props.communities[this.props.activeGroupIndex];
        this.setState({eventModal: true});
        let result = await getGroupEvents(group.id);
        result = result.data.map(x => ({
            date: toDateTime(x.eventDate.seconds),
            description: x.eventDescription,
            link: x.eventLink
        }));
        this.setState({events: result});
    };

    onCreateEventModal = () => {
        this.setState({eventModal: false, createEventModal: true});
    };

    onCreateEvent = async () => {
        const group = this.props.activeGroup === "class" ? this.props.classes[this.props.activeGroupIndex] : this.props.communities[this.props.activeGroupIndex];
        const data = {
            eventDescription: this.state.description,
            eventDate: new Date(this.state.date),
            eventCapacity: parseInt(this.state.capacity),
            eventDuration: parseInt(this.state.duration),
            eventPlace: this.state.place,
            eventOrganizers: [group.id],
            organizerName: group.name,
            eventParticipants: [group.admin, ...group.assistants, ...group.members],
        };
        this.setState({eventCreateModalConfirm: true, createEventModal: false});
        await createEvent(data);
    };

    render() {
        return (
            <div className="max-h-screen overflow-scroll no-scrollbar">
                <Modal
                    closable={false}
                    title="Post Creating"
                    footer={null}
                    visible={this.state.createModal}>
                    <p>Please wait to create post</p>
                </Modal>
                <Modal
                    closable={false}
                    title="Leave Group"
                    cancelButtonProps={{style: {display: 'none'}}}
                    onOk={() => {
                        this.setState({leaveModal: false});
                    }}
                    visible={this.state.leaveModal}>
                    <p>You just leave the group </p>
                </Modal>

                <Modal
                    closable={false}
                    title="Leave Group Error"
                    cancelButtonProps={{style: {display: 'none'}}}
                    onOk={() => {
                        this.setState({onLeaveAdminModal: false});
                    }}
                    visible={this.state.onLeaveAdminModal}>
                    <p>You cannot leave the group since you are: admin</p>
                </Modal>

                <Modal
                    closable={false}
                    title={this.props.activeGroup === "class"
                        ? "Assignment Created"
                        : "Event Created"}
                    cancelButtonProps={{style: {display: 'none'}}}
                    onOk={() => {
                        this.setState({eventCreateModalConfirm: false});
                    }}
                    visible={this.state.eventCreateModalConfirm}>
                    <p>{this.props.activeGroup === "class"
                        ? "Assignment Created Successfully"
                        : "Event Created Successfully"}</p>
                </Modal>
                {this.props.activeGroupIndex === -1
                    ? <div className="flex flex-col mt-[10%] ml-[20%]">
                        <img
                            className=""
                            src={`${svgPath}undraw_selection_re_ycpo.svg`}
                            alt="choose"
                        />
                        <p className="text-lg text-gray-400 mt-5 text-center">Choose a class or community to create or
                            see posts</p>
                    </div>
                    : <div className="ml-5 mt-5 mr-5">
                        <div className="flex">
                            <img
                                className="w-40 rounded-full mr-5"
                                src={'https://source.unsplash.com/random/1080x1080/?education,' + this.props.activeGroupIndex}
                                alt="class"
                            />
                            <div>
                                <p className="text-2xl font-bold">
                                    {this.props.activeGroup === "class"
                                        ? this.props.classes[this.props.activeGroupIndex].name
                                        : this.props.communities[this.props.activeGroupIndex].name}</p>
                                <p className="max-w-[800px]">
                                    {this.props.activeGroup === "class"
                                        ? this.props.classes[this.props.activeGroupIndex].description
                                        : this.props.communities[this.props.activeGroupIndex].description}</p>
                            </div>
                        </div>
                        {this.props.createPost
                            ? <WritePost
                                setCreatePostScreen={this.props.setCreatePost}
                                onCreatePost={this.onCreatePost}/>
                            : this.props.readPost ? <ReadPost
                                    setReadPost={this.props.setReadPost}
                                    post={this.props.posts[this.props.readPostIndex]}
                                    users={this.props.users}
                                    user={this.props.user}
                                />
                                : <div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                this.setState({modal: true});
                                            }}
                                            className="border border-sky-500 mr-2 p-2 px-6 rounded mt-5 hover:bg-sky-500 hover:text-white">
                                            Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                this.onAssigmentShow();
                                            }}
                                            className="border border-orange-500 mr-2 p-2 px-6 rounded mt-5 hover:bg-orange-500 hover:text-white">
                                            {this.props.activeGroup === "class"
                                                ? "Assignments"
                                                : "Events"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                this.setCreatePostScreen(true);
                                            }}
                                            className="border border-green-500 p-2 px-6 rounded mt-5 hover:bg-green-500 hover:text-white">
                                            Create New Post
                                        </button>
                                        <span
                                            className="border border-gray-400 rounded p-2 px-4 ml-4 focus-within:border-blue-400">
                                            <input
                                                className="ml-2 inline-block min-w-[500px] focus:outline-none"
                                                placeholder="Search posts"
                                                onChange={(e) => {
                                                    this.props.search(e.target.value);
                                                }}/>
                                            <i className="ri-search-line text-xl text-gray-400 peer-focus:text-blue-400"/>
                                        </span>
                                    </div>
                                    <Modal
                                        closable={false}
                                        cancelButtonProps={{style: {display: 'none'}}}
                                        title={this.props.activeGroup === "class"
                                            ? this.props.classes[this.props.activeGroupIndex].name
                                            : this.props.communities[this.props.activeGroupIndex].name}
                                        visible={this.state.modal} onOk={() => {
                                        this.setState({modal: false});
                                    }}
                                        width={1000}
                                    >
                                        <p><span
                                            className="font-bold">Description: </span> {this.props.activeGroup === "class"
                                            ? this.props.classes[this.props.activeGroupIndex].description
                                            : this.props.communities[this.props.activeGroupIndex].description}</p>
                                        <p className="font-bold">Admin</p>
                                        <p>{this.props.activeGroup === "class"
                                            ? this.props.users.filter(x => x.id === this.props.classes[this.props.activeGroupIndex].admin)[0].name
                                            : this.props.users.filter(x => x.id === this.props.communities[this.props.activeGroupIndex].admin)[0].name}</p>
                                        <p className="font-bold">Assistants</p>
                                        <p>{this.props.activeGroup === "class"
                                            ? this.props.users.filter(x => this.props.classes[this.props.activeGroupIndex].assistants.includes(x.id)).map(a => a.name).join(", ")
                                            : this.props.users.filter(x => this.props.communities[this.props.activeGroupIndex].assistants.includes(x.id)).map(a => a.name).join(", ")}</p>
                                        <p className="font-bold">Members</p>
                                        <p>{this.props.activeGroup === "class"
                                            ? this.props.users.filter(x => this.props.classes[this.props.activeGroupIndex].members.includes(x.id)).map(a => a.name).join(", ")
                                            : this.props.users.filter(x => this.props.communities[this.props.activeGroupIndex].members.includes(x.id)).map(a => a.name).join(", ")}</p>
                                        <button
                                            onClick={() => {
                                                this.onLeaveGroup();
                                            }}
                                            className="border border-red-500 hover:bg-red-500 hover:text-white px-6 py-1.5 rounded">Leave
                                        </button>
                                    </Modal>
                                    <Modal
                                        closable={false}
                                        cancelButtonProps={{style: {display: 'none'}}}
                                        title={this.props.activeGroup === "class"
                                            ? "Assignments"
                                            : "Events"}
                                        visible={this.state.eventModal} onOk={() => {
                                        this.setState({eventModal: false});
                                    }}
                                        width={1000}
                                    >
                                        <button onClick={() => this.onCreateEventModal()}
                                                className="px-8 py-2 border border-green-500 hover:bg-green-500 hover:text-white rounded my-2"
                                        >{this.props.activeGroup === "class"
                                            ? "Create New Assignment"
                                            : "Create New Event"}</button>
                                        {this.state.events.map((item, index) => {
                                            return <div className="py-2 border-b border-zinc-300" key={index}>
                                                <p className="mt-2 font-bold">{item.description}</p>
                                                <p>Date: <span>{item.date}</span>, <a className="mx-2" target="_blank"
                                                                                      href={item.link}>Click
                                                    for
                                                    Details</a></p>
                                            </div>;
                                        })}
                                    </Modal>

                                    <Modal
                                        closable={false}
                                        title={this.props.activeGroup === "class"
                                            ? "Create New Assignment"
                                            : "Create New Event"}
                                        visible={this.state.createEventModal} onCancel={() => {
                                        this.setState({createEventModal: false});
                                    }}
                                        onOk={() => {
                                            this.onCreateEvent();
                                        }}
                                        width={1000}
                                    >
                                        <div className="my-2">
                                            <span className="mx-1">{this.props.activeGroup === "class"
                                                ? "Assignment "
                                                : "Event "} Description </span>
                                            <input onChange={(e) => {
                                                this.setState({description: e.target.value});
                                            }}
                                                   className="border border-zinc-400 focus:border-green-500 focus:outline-none py-1 px-2 w-full rounded block"/>
                                        </div>
                                        <div className="my-2 ">
                                            <div className="inline-block w-1/2">
                                                <span className="mx-1">{this.props.activeGroup === "class"
                                                    ? "Assignment"
                                                    : "Event"} Date </span>
                                                <input type="datetime-local" onChange={(e) => {
                                                    this.setState({date: e.target.value});
                                                }}
                                                       className="block w-full border border-zinc-400 focus:border-green-500 focus:outline-none rounded block py-1 px-2 mr-2"
                                                />
                                            </div>
                                            <div className="inline-block w-1/2">
                                                <span className="mx-2">Assignment Place </span>
                                                <input onChange={(e) => {
                                                    this.setState({place: e.target.value});
                                                }}
                                                       className="border border-zinc-400 focus:border-green-500 focus:outline-none w-full py-1 px-2 rounded block ml-2"/>
                                            </div>
                                        </div>

                                        <div className="my-2 ">
                                            <div className="inline-block w-1/2">
                                                <span className="mx-1">{this.props.activeGroup === "class"
                                                    ? "Assignment"
                                                    : "Event"} Capacity </span>
                                                <input onChange={(e) => {
                                                    this.setState({capacity: e.target.value});
                                                }}
                                                       className="border border-zinc-400 focus:border-green-500 focus:outline-none w-full py-1 px-2 rounded block mr-2"
                                                       type="number"/>
                                            </div>
                                            <div className="inline-block w-1/2 ">
                                                <span className="mx-2">{this.props.activeGroup === "class"
                                                    ? "Assignment"
                                                    : "Event"} Duration </span>
                                                <input onChange={(e) => {
                                                    this.setState({duration: e.target.value});
                                                }}
                                                       className="border border-zinc-400 focus:border-green-500 focus:outline-none w-full py-1 px-2 rounded block ml-2"
                                                       type="number"/>
                                            </div>
                                        </div>
                                    </Modal>

                                    <p className="my-5 text-xl font-bold border-b border-zinc-300 ">Posts</p>
                                    <ul className="">
                                        {this.props.posts.map((item, index) => {
                                            return <PostList index={index} key={index} data={item}
                                                             user={this.props.users.filter(x => x.id === item.author)[0]}
                                                             setReadPost={this.props.setReadPost}/>;
                                        })}
                                    </ul>
                                </div>}
                    </div>}
            </div>
        );
    }
}

export default GroupContent;
