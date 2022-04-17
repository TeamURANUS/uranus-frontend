import React, {Component} from 'react';
import PostList from "./PostList";
import WritePost from "./WritePost";
import ReadPost from "./ReadPost";
import {Modal} from "antd";

const svgPath = process.env.PUBLIC_URL + '/svg/';

class GroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    async componentDidMount() {

    }


    createNewPost = (title, content) => {
        console.log(title, content);
    };

    setCreatePostScreen = (s) => {
        this.props.setCreatePost(true);
    };

    render() {
        return (
            <div className="max-h-screen overflow-scroll no-scrollbar">
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
                                src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
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
                            ? <WritePost createNewPost={this.createNewPost}
                                         setCreatePostScreen={this.props.setCreatePost}/>
                            : this.props.readPost ? <ReadPost
                                    setReadPost={this.props.setReadPost}
                                    post={this.props.posts[this.props.readPostIndex]}
                                    users={this.props.users}
                                />
                                : <div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                 this.setState({modal: true})
                                            }}
                                            className="border border-sky-500 mr-2 p-2 px-6 rounded mt-5 hover:bg-sky-500 hover:text-white">
                                            Details
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
                                        title={this.props.activeGroup === "class"
                                        ? this.props.classes[this.props.activeGroupIndex].name
                                        : this.props.communities[this.props.activeGroupIndex].name} visible={this.state.modal} onOk={() => {this.setState({modal: false})}}>
                                        <p><span className="font-bold">Description: </span> {this.props.activeGroup === "class"
                                            ? this.props.classes[this.props.activeGroupIndex].description
                                            : this.props.communities[this.props.activeGroupIndex].description}</p>
                                        <p className="font-bold">Admin</p>
                                        <p>{this.props.activeGroup === "class"
                                            ? this.props.users.filter(x=>x.id === this.props.classes[this.props.activeGroupIndex].admin)[0].name
                                            : this.props.users.filter(x=>x.id === this.props.communities[this.props.activeGroupIndex].admin)[0].name}</p>
                                        <p className="font-bold">Assistants</p>
                                        <p>{this.props.activeGroup === "class"
                                            ? this.props.users.filter(x=> this.props.classes[this.props.activeGroupIndex].assistants.includes(x.id)).map(a=>a.name).join(", ")
                                            : this.props.users.filter(x=> this.props.communities[this.props.activeGroupIndex].assistants.includes(x.id)).map(a=>a.name).join(", ")}</p>
                                        <p className="font-bold">Members</p>
                                        <p>{this.props.activeGroup === "class"
                                            ? this.props.users.filter(x=> this.props.classes[this.props.activeGroupIndex].members.includes(x.id)).map(a=>a.name).join(", ")
                                            : this.props.users.filter(x=> this.props.communities[this.props.activeGroupIndex].members.includes(x.id)).map(a=>a.name).join(", ")}</p>
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
