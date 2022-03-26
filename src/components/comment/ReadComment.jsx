import React from 'react';
import {Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const randomAvatar = "https://joeschmoe.io/api/v1/" + Math.floor(Math.random() * 18).toString()

const ReadComment = (props) => {

    return (
        <Comment
            author={<a>{props.name}</a>}
            avatar={<Avatar src={randomAvatar} alt={props.name}/>}
            content={
                <p>
                    {props.text}
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    );
};

export default ReadComment;
