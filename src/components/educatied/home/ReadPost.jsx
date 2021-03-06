import {Comment, Avatar, Tooltip} from 'antd';
import ReadComment from "./ReadComment";
import React, {useEffect, useState} from "react";
import WriteComment from "./WriteComment";

const ReadPost = (props) => {

    const [user, setUser] = useState({
        id: "id",
        name: "name"
    });

    useEffect(() => {
        setUser(props.users.filter(x => x.id === props.post.author)[0]);
    }, [props.users, props.post.author]);


    return (
        <div className="mt-10 md:min-w-[900px]">
            <button className="px-8 mb-3 py-2 border border-sky-500 rounded hover:text-white hover:bg-sky-500"
                    onClick={() => {
                        props.setReadPost(false, 0);
                    }}
            >Go Back
            </button>
            <p className="text-xl font-bold max-w-[1400px]">{props.post.title}</p>
            <Comment
                className="text-xl"
                author={<span className="text-xs font-bold">{user.name}</span>}
                avatar={<Avatar src={"https://joeschmoe.io/api/v1/" + user.id}/>}
                content={
                    <p className="max-w-[1400px] text-lg">
                        {props.post.text}
                    </p>
                }
                datetime={
                    <Tooltip>
                        <span>{props.post.date}</span>
                    </Tooltip>
                }
            />
            <hr/>
            <ul>
                {props.post.comments.map((item, index) => {
                    return <ReadComment index={index} key={index} id={item} users={props.users}/>;
                })}
            </ul>
            <WriteComment user={props.user} post={props.post}/>
        </div>
    );
};

export default ReadPost;
