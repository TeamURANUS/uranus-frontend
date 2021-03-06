import React, {Component} from 'react';
import NewsContent from "./news/NewsContent";
import GroupContent from "./home/GroupContent";
import NotificationContent from "./notifs/NotificationContent";
import CalendarContent from "./calendar/CalendarContent";
import SettingsContent from "./settings/SettingsContent";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        reGetPost={this.props.reGetPosts}
                        setClasses={this.props.setClasses}
                        setCommunities={this.props.setCommunities}
                        setStateData={this.props.setStateData}
                    />
                    : this.props.active === 2 ?
                        <CalendarContent
                            user={this.props.user}/>
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
                                : <SettingsContent user={this.props.user} logout={this.props.logout}/>
                }
            </div>
        );
    }
}

export default Content;
