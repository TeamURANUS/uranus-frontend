import React, {Component} from 'react';
import Group from "./home/Group";

class SubMenu extends Component {
    render() {
        return (<div className="w-180 min-w-[300px] max-w-[360px] bg-blue p-2 border-r border-r-gray-300">
            <select className="w-[80%] text-center mx-auto border-b border-gray-300 py-1 text-lg mt-5 mb-5"
                    onChange={(e) => {
                        this.props.activeGroupChange(e.target.value);
                    }}>
                <option value="class">Classes</option>
                <option value="community">Communities</option>
            </select>
            {this.props.activeGroup === "class" ?
                <ul className="cursor-default select-none">
                    <Group active={this.props.activeGroupIndex === 1} groupName="Class 1"
                           onClick={this.props.activeGroupIndexChange} index={1}
                    />
                    <Group active={this.props.activeGroupIndex === 2} groupName="Class 2"
                           onClick={this.props.activeGroupIndexChange} index={2}
                    />
                    <Group active={this.props.activeGroupIndex === 3} groupName="Class 3"
                           onClick={this.props.activeGroupIndexChange} index={3}/>
                    <Group active={this.props.activeGroupIndex === 4} groupName="Class 4"
                           onClick={this.props.activeGroupIndexChange} index={4}/>
                    <Group active={this.props.activeGroupIndex === 5} groupName="Class 5"
                           onClick={this.props.activeGroupIndexChange} index={5}/>
                </ul>
                : <ul className="cursor-default">
                    <Group active={this.props.activeGroupIndex === 1} groupName="Community 1"/>
                    <Group active={this.props.activeGroupIndex === 2} groupName="Community 2"/>
                    <Group active={this.props.activeGroupIndex === 3} groupName="Community 3"/>
                    <Group active={this.props.activeGroupIndex === 4} groupName="Community 4"/>
                    <Group active={this.props.activeGroupIndex === 5} groupName="Community 5"/>
                </ul>}
        </div>);
    }
}

export default SubMenu;
