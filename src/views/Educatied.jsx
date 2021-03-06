import React, {Component} from 'react';
import SigninSignup from "../components/authentication/SigninSignup";
import MainMenu from "../components/educatied/MainMenu";
import SubMenu from "../components/educatied/SubMenu";
import TopMenu from "../components/educatied/TopMenu";
import Content from "../components/educatied/Content";
import EmailVerification from "../components/authentication/EmailVerification";
import ExtraInformation from "../components/authentication/ExtraInformation";
import {getGroupsByUser, getPostsByGroupId} from "../services/groups";
import {getAllUsers} from "../services/user";

class Educatied extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            user: null,
            path: ["Home", "Classes"],
            activeMainMenu: 1,
            activeGroupType: "class",
            activeGroupIndex: -1,
            newsOpen: false,
            register: false,
            openMenu: false,
            classes: [],
            communities: [],
            posts: [],
            createPost: false,
            readPost: false,
            readPostIndex: -1,
            users: []
        };
    }

    toDateTime = (secs) => {
        const t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    };

    clearHomeState = () => {
        this.setState({
            activeGroupType: "class",
            activeGroupIndex: -1,
            classes: [],
            communities: [],
            posts: [],
            allPosts: [],
            createPost: false,
            readPost: false,
            readPostIndex: -1
        });
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    clearGroupState = () => {
        this.setState({
            posts: [],
            createPost: false,
            readPost: false,
            readPostIndex: -1
        });
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    async componentDidMount() {
        document.title = "Educatied - Home";
        this.setState({
            activeMainMenu: 1,
            activeGroupIndex: -1,
            classes: [],
            communities: [],
            posts: [],
            allPosts: [],
            createPost: false,
            readPost: false,
            readPostIndex: -1
        });
        const users = await getAllUsers();
        this.setState({
            users: users.data.data.map(x => ({
                id: x.id,
                name: x.userName + " " + x.userLastname
            }))
        });

        window.localStorage.setItem('state', JSON.stringify(this.state));
    }

    changeMainMenu = (newMenu) => {
        this.setState({activeMainMenu: newMenu});
        if (newMenu === 1) {
            document.title = "Educatied - Home";
            this.setState({path: ["Home", "Class"], activeGroupType: "class", activeGroupIndex: -1, newsOpen: false});
        } else if (newMenu === 2) {
            document.title = "Educatied - Calendar";
            this.setState({path: ["Calendar"], newsOpen: false});
        } else if (newMenu === 3) {
            document.title = "Educatied - News";
            this.setState({path: ["News"], newsOpen: false});
        } else if (newMenu === 4) {
            document.title = "Educatied - Notifs";
            this.setState({path: ["Notifications"], newsOpen: false});
        } else {
            document.title = "Educatied - Settings";
            this.setState({path: ["Settings"], newsOpen: false});
        }
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    changeGroupType = async (groupType) => {
        this.clearGroupState();
        this.setState({
            activeGroupType: groupType,
            activeGroupIndex: -1,
            posts: [],
            allPosts: [],
            readPost: false,
            createPost: false
        });
        const result = await getGroupsByUser(this.state.user.id);
        if (result.status === 200) {
            if (this.state.activeGroup === "class") {
                this.setClasses(
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
                this.setCommunities(
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

        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    changeGroupIndex = async (index) => {
        this.clearGroupState();
        if (index !== -1) {
            this.setState({activeGroupIndex: index});
            let posts;
            if (this.state.activeGroupType === "class") {
                posts = await getPostsByGroupId(this.state.classes[index].id);
            } else {
                posts = await getPostsByGroupId(this.state.communities[index].id);
            }
            posts = posts.data.map(x => ({
                id: x.id,
                date: this.toDateTime(x.postDate.seconds).toLocaleString("en-GB").replace(",", ""),
                dateObj: this.toDateTime(x.postDate.seconds),
                title: x.postTitle,
                text: x.postContent,
                avatar: "https://joeschmoe.io/api/v1/",
                author: x.postAuthor._key.path.segments[6],
                isAdmin: x.postSentByAdmin,
                comments: x.postComments.map(a => a._key.path.segments[6])
            })).sort((a, b) => a.dateObj < b.dateObj ? -1 : 1);
            this.setState({
                allPosts: posts, posts: posts
            });
        }
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };


    reGetPosts = async () => {
        let posts;
        if (this.state.activeGroupType === "class") {
            posts = await getPostsByGroupId(this.state.classes[this.state.activeGroupIndex].id);
        } else {
            posts = await getPostsByGroupId(this.state.communities[this.state.activeGroupIndex].id);
        }
        posts = posts.data.map(x => ({
            id: x.id,
            date: this.toDateTime(x.postDate.seconds).toLocaleString("en-GB").replace(",", ""),
            dateObj: this.toDateTime(x.postDate.seconds),
            title: x.postTitle,
            text: x.postContent,
            avatar: "https://joeschmoe.io/api/v1/",
            author: x.postAuthor._key.path.segments[6],
            isAdmin: x.postSentByAdmin,
            comments: x.postComments.map(a => a._key.path.segments[6])
        })).sort((a, b) => a.dateObj < b.dateObj ? -1 : 1);
        this.setState({
            allPosts: posts, posts: posts
        });
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    openNewsWithId = (id) => {
        this.setState({newsOpen: true});
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    closeNewContent = () => {
        this.setState({newsOpen: false});
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    setUser = (user, register) => {
        this.setState({user: user, register: register});
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    setMenuOpen = (newState) => {
        this.setState({openMenu: newState});
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    logout = () => {
        this.setState({user: null});
        window.localStorage.removeItem('state');
    };

    setClasses = (classes) => {
        this.setState({classes: classes});
    };

    setCommunities = (communities) => {
        this.setState({communities: communities});
    };

    setReadPost = (isRead, index) => {
        this.setState({readPost: isRead, readPostIndex: index});
    };

    search = (query) => {
        this.setState({
            posts: this.state.allPosts.filter(x => x.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                || x.text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                || x.author.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        });
    };

    setCreatePost = (value) => {
        this.setState({createPost: value});
    };

    setStateData = (data) => {
        this.setState(data);
    };

    render() {
        return (
            <div>
                {this.state.user == null ? <SigninSignup setUser={this.setUser}/>
                    : this.state.register === true ? <ExtraInformation user={this.state.user} setUser={this.setUser}/>
                        : this.state.user.isVerified === false ? <EmailVerification setUser={this.setUser}/>
                            :
                            <div>
                                <TopMenu path={this.state.path} user={this.state.user} logout={this.logout}
                                         goHome={this.changeMainMenu}/>
                                <div className="flex">
                                    <MainMenu activeMenuChange={this.changeMainMenu}
                                              activeMenu={this.state.activeMainMenu}
                                              open={this.state.openMenu}
                                              setOpen={this.setMenuOpen}/>
                                    <div className={this.state.openMenu ? "flex ml-[180px]" : "flex ml-[60px]"}>
                                        {this.state.activeMainMenu === 1 ?
                                            <SubMenu activeGroupChange={this.changeGroupType}
                                                     activeGroup={this.state.activeGroupType}
                                                     activeGroupIndexChange={this.changeGroupIndex}
                                                     activeGroupIndex={this.state.activeGroupIndex}
                                                     user={this.state.user}
                                                     setClasses={this.setClasses}
                                                     setCommunities={this.setCommunities}
                                                     classes={this.state.classes}
                                                     communities={this.state.communities}
                                                     setActiveGroupIndex={this.changeGroupIndex}
                                            />
                                            : ""
                                        }
                                        <Content
                                            active={this.state.activeMainMenu}
                                            onNewsClick={this.openNewsWithId}
                                            newsOpen={this.state.newsOpen}
                                            newsClose={this.closeNewContent}
                                            activeGroup={this.state.activeGroupType}
                                            activeGroupIndex={this.state.activeGroupIndex}
                                            user={this.state.user}
                                            classes={this.state.classes}
                                            communities={this.state.communities}
                                            posts={this.state.posts}
                                            createPost={this.state.createPost}
                                            readPost={this.state.readPost}
                                            readPostIndex={this.state.readPostIndex}
                                            setReadPost={this.setReadPost}
                                            search={this.search}
                                            users={this.state.users}
                                            setCreatePost={this.setCreatePost}
                                            logout={this.logout}
                                            reGetPosts={this.reGetPosts}
                                            setClasses={this.setClasses}
                                            setCommunities={this.setCommunities}
                                            setStateData={this.setStateData}
                                        />
                                    </div>
                                </div>
                            </div>
                }
            </div>
        );
    }
}

export default Educatied;
