import {Comment, Avatar, Form, Button, List, Input} from 'antd';
import moment from 'moment';
import React from "react";

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
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

class WriteComment extends React.Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        name: '',
        avatarID: Math.floor(Math.random() * 18)
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
            name: this.props.name
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    {
                        author: this.state.name,
                        avatar: 'https://joeschmoe.io/api/v1/' + this.state.avatarID.toString(),
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                ],
            });
        }, 1000);
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
                    avatar={<Avatar src={"https://joeschmoe.io/api/v1/" + this.state.avatarID.toString()}
                                    alt="Han Solo"/>}
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
