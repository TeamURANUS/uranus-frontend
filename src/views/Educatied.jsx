import React, {Component} from 'react';
import SigninSignup from "../components/authentication/SigninSignup";
import MainMenu from "../components/educatied/MainMenu";
import SubMenu from "../components/educatied/SubMenu";
import TopMenu from "../components/educatied/TopMenu";
import Content from "../components/educatied/Content";
import EmailVerification from "../components/authentication/EmailVerification";
import ExtraInformation from "../components/authentication/ExtraInformation";

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
            communities: []
        };
    }

    componentDidMount() {
        document.title = "Educatied - Home";
    }

    changeMainMenu = (newMenu) => {
        this.setState({activeMainMenu: newMenu});
        if (newMenu === 1) {
            document.title = "Educatied - Home";
            this.setState({path: ["Home", "Class"], activeGroupType: "class", activeGroupIndex: 0, newsOpen: false});
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

    changeGroupType = (groupType) => {
        console.log(groupType);
        this.setState({activeGroupType: groupType});
        this.setState({activeGroupIndex: 0});
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    changeGroupIndex = (index) => {
        console.log(index);
        this.setState({activeGroupIndex: index});
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    openNewsWithId = (id) => {
        console.log(id);
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
        window.localStorage.setItem('state', JSON.stringify(this.state));
    };

    setClasses = (classes) => {
        this.setState({classes: classes});
    };

    setCommunities = (communities) => {
        this.setState({communities: communities});
    };

    render() {
        return (
            <div>
                {this.state.user == null ? <SigninSignup setUser={this.setUser}/>
                    : this.state.register === true ? <ExtraInformation user={this.state.user} setUser={this.setUser}/>
                        : this.state.user.isVerified === false ? <EmailVerification setUser={this.setUser}/>
                            :
                            <div>
                                <TopMenu path={this.state.path} user={this.state.user} logout={this.logout}/>
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
