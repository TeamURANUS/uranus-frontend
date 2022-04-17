import {Input, Button, Form} from 'antd';
import {useState} from "react";


const {TextArea} = Input;


const WritePost = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <Form>
            <p className="text-xl font-bold mt-7">Create New Post</p>
            <div className="my-5">
                <span className="text-gray-500">Title</span>
                <Input placeholder="Enter the title of the post" showCount allowClear
                       className="!py-3"
                       onChange={(e) => {
                           setTitle(e.target.value);
                       }}
                />
            </div>
            <div className="my-5">
                <span className="text-gray-500">Content</span>
                <TextArea placeholder="Enter the content for post" showCount allowClear
                          autoSize={{"minRows": 10}}
                          onChange={(e) => {
                              setContent(e.target.value);
                          }}/>
            </div>
            <Button type="primary" onClick={() => {
                props.createNewPost(title, content);
            }}>Submit Post</Button>
            <Button type="secondary" className="ml-5" onClick={() => {
                console.log(props);
                props.setCreatePostScreen(false);
            }}>Cancel Post</Button>
        </Form>
    );
};

export default WritePost;
