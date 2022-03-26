import {Comment, Avatar, Tooltip, Card} from 'antd';
import moment from "moment";
import 'antd/dist/antd.css';
import './ReadPost.css'

const randomAvatar = "https://joeschmoe.io/api/v1/" + Math.floor(Math.random() * 18).toString()

const ReadPost = (props) => {
    return (
        <Card id="post-card">
            <p id="title-text">{props.title}</p>
            <Comment id="read-post"
                     title={props.title}
                     author={<a>{props.author}</a>}
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
        </Card>
    );
}

export default ReadPost;
