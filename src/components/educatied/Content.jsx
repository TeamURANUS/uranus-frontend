import React, {Component} from 'react';
import NewsContent from "./news/NewsContent";
import {Calendar} from "antd";
import GroupContent from "./home/GroupContent";
import NotificationContent from "./notifs/NotificationContent";
import SettingsContent from "./settings/SettingsContent";

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
                            <NewsContent onNewsClick={this.props.onNewsClick}
                                         newsOpen={this.props.newsOpen}
                                         newsClose={this.props.newsClose}/>
                            : this.props.active === 4
                                ? <NotificationContent
                                    user={this.props.user}
                                    classes={this.props.classes}
                                    communities={this.props.communities}
                                />
                                : <SettingsContent user={this.props.user}/>
                }
            </div>
        );
    }
}

export default Content;
