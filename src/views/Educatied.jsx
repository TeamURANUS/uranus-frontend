import React, {Component} from 'react';
import SigninSignup from "../components/authentication/SigninSignup";
import MainMenu from "../components/educatied/MainMenu";
import SubMenu from "../components/educatied/SubMenu";
import TopMenu from "../components/educatied/TopMenu";
import {Calendar} from "antd";
import Content from "../components/educatied/Content";

class Educatied extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            path: ["Home", "Classes"],
            activeMainMenu: 1,
            activeGroupType: "class",
            activeGroupIndex: 0,
            newsOpen: false
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
    };

    changeGroupType = (groupType) => {
        console.log(groupType);
        this.setState({activeGroupType: groupType});
        this.setState({activeGroupIndex: 0});
    };

    changeGroupIndex = (index) => {
        console.log("asd");
        console.log(index);
        this.setState({activeGroupIndex: index});
    };

    openNewsWithId = (id) => {
        console.log(id);
        this.setState({newsOpen: true});
    };

    closeNewContent = () => {
        this.setState({newsOpen: false});
    }

    render() {
        return (
            <div>
                <TopMenu path={this.state.path}/>
                <div className="flex">
                    <MainMenu activeMenuChange={this.changeMainMenu} activeMenu={this.state.activeMainMenu}/>
                    <div className="w-full ml-[180px]">
                        <div className="flex">
                            <div>
                                {this.state.activeMainMenu === 1 ?
                                    <SubMenu activeGroupChange={this.changeGroupType}
                                             activeGroup={this.state.activeGroupType}
                                             activeGroupIndexChange={this.changeGroupIndex}
                                             activeGroupIndex={this.state.activeGroupIndex}/>
                                    : this.state.activeMainMenu === 2 ? <Calendar/>
                                        : this.state.activeMainMenu === 3 ? ""
                                            : this.state.activeMainMenu === 4 ? ""
                                                : ""
                                }
                            </div>
                            <Content
                                active={this.state.activeMainMenu}
                                onNewsClick={this.openNewsWithId}
                                newsOpen={this.state.newsOpen}
                                newsClose={this.closeNewContent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Educatied;
