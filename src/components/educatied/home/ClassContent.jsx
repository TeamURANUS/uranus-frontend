import React, {Component} from 'react';

import PostList from "./PostList";
import {getPostsByGroupId} from "../../../services/groups";


const svgPath = process.env.PUBLIC_URL + '/svg/';

class ClassContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [
                {
                    date: "10 March 2022 10.44",
                    title: "Proin tempor ante a dolor pellentesque, vitae aliquam massa interdum. Quisque a arcu in eros malesuada consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                    text: "Proin quam nisl, vestibulum sed urna sed, viverra viverra velit. Morbi bibendum ultrices mauris in condimentum. Donec imperdiet tincidunt neque, ac tincidunt tellus lobortis nec. Nunc dignissim erat pharetra, vehicula dolor at, blandit dolor. Nulla fermentum auctor lorem eu vulputate.",
                    avatar: "https://joeschmoe.io/api/v1/17",
                    author: "Ekrem Sönmezer"
                },
                {
                    date: "8 April 2021 10.44",
                    title: "Vivamus arcu justo, blandit id orci quis, sollicitudin pellentesque sapien. Donec porttitor nisi ac ipsum maximus, ac efficitur nunc pellentesque. Nam accumsan, diam eget gravida congue, justo dolor tincidunt quam, non euismod massa dolor sit amet tortor. Donec sollicitudin",
                    text: "Nam ac enim varius, semper nisl et, pretium sem. Donec maximus, libero quis ultrices efficitur, nunc nibh placerat dolor, vel elementum diam mauris a purus. Vestibulum mollis finibus mi id pulvinar. Nam sit amet justo sed dui venenatis aliquam quis et tellus. Nullam mi ex, efficitur eget erat eu, tempus tempus elit. ",
                    avatar: "https://joeschmoe.io/api/v1/14",
                    author: "Mustafa Bora Arslan"
                }
            ],
            posts: []
        };
    }

    async componentDidMount() {
        console.log(this.props.classes[this.props.activeGroupIndex]);
        const posts = await getPostsByGroupId(this.props.classes[this.props.activeGroupIndex].id);
        console.log(posts);
        // this.setState({posts: posts.map(x => ({
        //         asd:false
        //     }))});
        this.setState({posts: this.state.allPosts});
    }


    search = (query) => {
        this.setState({posts: this.state.allPosts.filter(x => x.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                || x.text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                || x.author.toLocaleLowerCase().includes(query.toLocaleLowerCase()))});
    };

    render() {
        return (
            <div className="max-h-screen overflow-scroll no-scrollbar">
                {this.props.activeGroupIndex === -1
                    ? <div className="flex flex-col mt-[50%] ml-[40%]">
                        <img
                            className="w-8"
                            src={`${svgPath}undraw_selection_re_ycpo.svg`}
                            alt="choose"
                        />
                        <p className="text-lg text-gray-400 mt-5 text-center">choose a class to create or see posts</p>
                    </div>
                    : <div className="ml-5 mt-5 mr-5">
                        <div className="flex">
                            <img
                                className="w-40 rounded-full mr-5"
                                src={"https://source.unsplash.com/random/1080x1080/?wallpaper,landscape," + Math.random()}
                                alt="class"
                            />
                            <div>
                                <p className="text-2xl font-bold">{this.props.classes[this.props.activeGroupIndex].name}</p>
                                <p className="max-w-[800px]">{this.props.classes[this.props.activeGroupIndex].description}</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="border border-green-500 p-2 px-6 rounded mt-5 hover:bg-green-500 hover:text-white">
                                Create New Post
                            </button>
                            <span className="border border-gray-400 rounded p-2 px-4 ml-4 focus-within:border-blue-400">
                                <input
                                    className="ml-2 inline-block min-w-[500px] focus:outline-none"
                                    placeholder="Search posts"
                                    onChange={(e) => {
                                        this.search(e.target.value);
                                    }}/>
                                <i className="ri-search-line text-xl text-gray-400 peer-focus:text-blue-400"/>
                            </span>
                        </div>
                        <p className="my-5 text-xl font-bold border-b border-zinc-300 ">Posts</p>
                        <ul className="">
                            {this.state.posts.map((item, index) => {
                                return <PostList key={index} data={item}/>;
                            })}
                        </ul>
                    </div>}
            </div>
        );
    }
}

export default ClassContent;
