import React, {Component} from 'react';

class PostList extends Component {
    render() {
        return (
            <li onClick={() => {
                this.props.setReadPost(true,this.props.index)
            }}
                className="border-b border-zinc-300 mb-3 max-w-[1400px] select-none">
                <span className="text-zinc-400 block">{this.props.data.date}</span>
                <span className="font-bold block my-1">{this.props.data.title.substring(0,180)}</span>
                <p>{this.props.data.text.substring(0,285)}</p>
                <p className="">
                    <img
                        className="w-[24px] rounded-full inline-block"
                        src={this.props.user.image}
                        alt="avatar"
                    />
                    <span className="ml-2 text-xs font-bold text-zinc-500"><span>{this.props.data.isAdmin ? "(Admin) ": ""}</span>{this.props.user.name}</span>
                </p>
            </li>
        );
    }
}

export default PostList;
