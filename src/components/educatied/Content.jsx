import React, {Component} from 'react';
import News from "./news/News";
import NewsContent from "./news/NewsContent";
import {Calendar} from "antd";
import GroupContent from "./home/GroupContent";
import NotificationContent from "./notifs/NotificationContent";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {
                image: "",
                title: "",
                text: "",
                author: "",
                date: ""
            }
        };
    }

    openNews = (url, title, author, date, text) => {
        this.props.onNewsClick();
        this.setState({
            news: {
                image: url,
                title: title,
                text: text,
                author: author,
                date: date
            }
        });
    };


    render() {
        return (
            <div className="mt-[5rem]">
                {this.props.active === 1 ?
                    <GroupContent
                        activeGroup={this.props.activeGroup}
                        activeGroupIndex={this.props.activeGroupIndex}
                        user={this.props.user}
                        classes={this.props.classes}
                        communities={this.props.communities}
                        posts={this.props.posts}
                        createPost={this.props.createPost}
                        readPost={this.props.readPost}
                        readPostIndex={this.props.readPostIndex}
                        setReadPost={this.props.setReadPost}
                        search={this.props.search}
                        users={this.props.users}
                        setCreatePost={this.props.setCreatePost}
                    />
                    : this.props.active === 2 ? <Calendar/>
                        : this.props.active === 3 ?
                            <div>
                                {this.props.newsOpen ?
                                    <div className="ml-5 mr-3 mt-3">
                                        <button onClick={this.props.newsClose}
                                                className="mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                            Go back
                                        </button>
                                        <NewsContent
                                            title={this.state.news.title}
                                            image={this.state.news.image}
                                            author={this.state.news.author}
                                            date={this.state.news.date}
                                            text={this.state.news.text}
                                        />
                                    </div>
                                    :
                                    <div>
                                        <p className="font-bold text-2xl ml-5 mt-5">News</p>
                                        <ul className="ml-5 mr-3 select-none">

                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />
                                        </ul>
                                    </div>
                                }
                            </div>
                            : this.props.active === 4
                                ? <NotificationContent
                                user={this.props.user}
                                classes={this.props.classes}
                                communities={this.props.communities}
                                />
                                : "settings"
                }
            </div>
        );
    }
}

export default Content;
