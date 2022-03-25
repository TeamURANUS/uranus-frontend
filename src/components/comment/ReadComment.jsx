import React from 'react';
import {Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const ReadComment = (props) => {

    return (
        <Comment
            author={<a>{props.name}</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={props.name}/>}
            content={
                <p>
                    IE classes are fun
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
