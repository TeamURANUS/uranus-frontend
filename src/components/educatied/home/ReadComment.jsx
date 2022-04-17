import React, {useEffect, useState} from 'react';
import {Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import {getCommentById} from "../../../services/groups";
import {getUserById} from "../../../services/user";

const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t.toLocaleString("en-GB").replace(",", "");
};

const ReadComment = (props) => {

    const [comment, setComment] = useState({
        commentContent: "",
        commentDate: {seconds: 0}
    });
    const [user, setUser] = useState({
        id: "id",
        name: "Name"
    });

    useEffect(async () => {
        const comment = await getCommentById(props.id);
        setComment(comment.data.data);
        console.log(comment);
        setUser(props.users.filter(x => x.id === comment.data.data.commentAuthor._key.path.segments[6])[0]);
    }, [props.id]);

    return (
        <Comment
            author={<a>{user.name}</a>}
            avatar={<Avatar src={"https://joeschmoe.io/api/v1/" + user.id} alt="avatar"/>}
            content={
                <p>
                    {comment.commentContent}
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{toDateTime(comment.commentDate.seconds)}</span>
                </Tooltip>
            }
        />
    );
};

export default ReadComment;
