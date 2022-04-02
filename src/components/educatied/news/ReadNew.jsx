import {useState} from "react";
import {Comment, Tooltip, Card} from 'antd';
import {Typography} from 'antd';
import moment from "moment";
import 'antd/dist/antd.css';
import './ReadNew.css'

const {Paragraph} = Typography;


const ReadNew = (props) => {
    const [ellipsis, setEllipsis] = useState(true);

    return (
        <div>
            <Card id="new-title-card">
                <Comment id="read-new"
                         content={
                             <p id="title-text">
                                 {props.title}
                             </p>
                         }
                         datetime={
                             <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                 <span>{moment().fromNow()}</span>
                             </Tooltip>
                         }
                />
            </Card>
            <br/>
            <br/>
            <Card id="new-content-card">
                <Paragraph
                    ellipsis={ellipsis ? {
                        rows: 2,
                        expandable: true,
                        symbol: 'more',
                    } : false}>
                    {props.text}{props.text}
                </Paragraph>
            </Card>
        </div>
    );
}

export default ReadNew;
