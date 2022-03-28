import Home from "./views/Home";
import About from "./views/About";
import Educatied from "./views/Educatied";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/educatied">
                        <Educatied/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
