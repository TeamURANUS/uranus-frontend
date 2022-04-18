import {Comment, Avatar, Form, Button, List, Input} from 'antd';
import React from "react";
import {createComment, updatePostData} from "../../../services/groups";

const {TextArea} = Input;


const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" className="!rounded">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

class WriteComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
            name: '',
            avatarID: 'https://joeschmoe.io/api/v1/' + this.props.user.id
        };
    }

    handleSubmit = async () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
            name: this.props.name
        });

        this.setState({
            submitting: false,
            value: '',
            comments: [
                ...this.state.comments,
                {
                    author: this.props.user.name + " " + this.props.user.lastname,
                    avatar: 'https://joeschmoe.io/api/v1/' + this.props.user.id,
                    content: <p>{this.state.value}</p>,
                    datetime: new Date().toLocaleString("en-GB"),
                },
            ],
        });
        const data = {
            commentAuthor: this.props.user.id,
            commentContent: this.state.value,
            commentDate: new Date(),
        };
        let result = await createComment(data);
        result = result.data.message.replace("comment created ", "").trim();
        const updateData = {
            postComments: [...this.props.post.comments, result]
        };
        this.props.post.comments.push(result);
        await updatePostData(this.props.post.id, updateData);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {comments, submitting, value} = this.state;

        return (
            <>
                {comments.length > 0 && <CommentList comments={comments}/>}
                <Comment
                    avatar={<Avatar src={'https://joeschmoe.io/api/v1/' + this.props.user.id} alt="pp"/>}
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        );
    }
}

export default WriteComment;
