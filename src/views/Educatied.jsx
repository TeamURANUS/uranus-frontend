import React, {Component} from 'react';
import SigninSignup from "../components/authentication/SigninSignup";

class Educatied extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null
        };
      }

    render() {
        return (
            <div>
                <SigninSignup/>
            </div>
        );
    }
}

export default Educatied;
