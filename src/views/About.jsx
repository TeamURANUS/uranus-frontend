import React, {Component} from 'react';

class About extends Component {

    componentDidMount() {
        document.title = "Educatied - About";
    }

    render() {
        return (
            <div>
                <p>About</p>
            </div>
        );
    }
}

export default About;
