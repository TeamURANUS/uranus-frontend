import {Input, Button, Form} from 'antd';
import 'antd/dist/antd.css';


const {TextArea} = Input;


const onChange = () => {
    //TODO after submission create readpost object
};

const WritePost = (props) => {

    return (
        <Form>
            <Input placeholder="Enter the title of the post" showCount allowClear/>
            <br/>
            <br/>
            <TextArea placeholder="Enter the content for post" showCount allowClear/>
            <br/>
            <Button type="primary" onClick={onChange}>Submit Post</Button>
        </Form>
    );
}

export default WritePost;
